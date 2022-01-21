import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { service as userService } from "./users.service";
import { signToken } from "./../utils/token.sign";
import { User } from "src/interfaces/user.interface";
import nodemailer from "nodemailer";
import config from "./../config/config";
import jwt from "jsonwebtoken";

class AuthService {

  constructor() {
  }

  async verifyUser(email: string, password: string) {
    const user = await userService.findByEmail(email);
    if (!user) throw boom.unauthorized("Invalid email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized("Invalid password");

    const userLoggued = Object.assign({}, user);
    delete userLoggued.password;

    return userLoggued;
  }

  signToken(user: User) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "15min"});
    return {user,token};
  }

  public async sendRecovery(email: string) {
    const user = await userService.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.recoverySecret, {expiresIn: "15min"});
    const link = `${config.apiUrl}/recovery?${token}`;

    await userService.update(user.id, {recoveryToken: token});

    const mail = {
      from: config.smtpConfig.user, // sender address
      to: user.email, // list of receivers
      subject: "Recupera tu contraseña", // Subject line
      html: `<b>Ingresa a este link para recuperar tu contraseña.</b>
      <a href=${link}>Recuperar</a>`, // html body
    }

    await this.sendMail(mail);
    return {message: "Email sent"};
  }

  private async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: config.smtpConfig.user,
        pass: config.smtpConfig.pass
      }
    });
    const info = await transporter.sendMail(infoMail);
    return info;
  }


  async changePassword(token: string, newPassword: string) {
    const payload: any = jwt.verify(token, config.recoverySecret);
    if (!payload) throw boom.unauthorized();

    const user = await userService.findById(payload.sub);
    if (!user) throw boom.unauthorized();
    if (user.recoveryToken !== token) throw boom.unauthorized();

    await userService.update(payload.sub, {
      password: bcrypt.hashSync(newPassword, 10),
      recoveryToken: null
    });

    return {message: "Password changed"};
  }

}

export const service = new AuthService();
