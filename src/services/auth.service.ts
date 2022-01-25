import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { service as userService } from "./users.service";
import MailerService from "./mailer.service";
import { User } from "src/interfaces/user.interface";
import config from "./../config/config";

class AuthService {
  private mailerService: MailerService;

  constructor() {
    this.mailerService = new MailerService();
  }

  /**
   * Verify user credentials for local login strategy
   */
  public async verifyUser(email: string, password: string) {
    const user = await userService.findWithPassword(email);
    if (!user) throw boom.unauthorized("Invalid email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized("Invalid password");

    delete user.password;
    return user;
  }

  public signSessionToken(user: User) {
    const payload = {
      sub: user._id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "2days"});
    return token;
  }

  public async sendRecovery(email: string) {
    const user = await userService.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const payload = {sub: user._id};
    const token = jwt.sign(payload, config.recoverySecret, {expiresIn: "15min"});
    await userService.update(user._id, {'recoveryToken': token});

    const link = `${config.apiUrl}/recovery?token=${token}`;

    const mail = {
      from: config.smtpConfig.user, // sender address
      to: user.email, // list of receivers
      subject: "Recupera tu contraseña", // Subject line
      html: `
        <b>Ingresa a este link para recuperar tu contraseña.</b>
        <a href=${link}>Recuperar</a>
      `
    }

    await this.mailerService.sendMail(mail);
    return {message: "Email sent"};
  }

  async changePassword(recoverToken: string, newPassword: string) {
    let payload: any;
    try {
      payload = jwt.verify(recoverToken, config.recoverySecret);
    } catch (error) {
      throw boom.unauthorized(error);
    }
    if (!payload) throw boom.unauthorized();

    const user = await userService.findByIdComplete(payload.sub);
    if (!user) throw boom.unauthorized();
    if (user.recoveryToken !== recoverToken) throw boom.unauthorized();

    const passwordHash = await bcrypt.hash(newPassword, 10);
    if (user.password === passwordHash) throw boom.unauthorized("Password is the same");

    await userService.update(payload.sub, {
      password: bcrypt.hashSync(newPassword, 10),
      recoveryToken: null
    });

    return {message: "Password changed"};
  }

}

export const service = new AuthService();
