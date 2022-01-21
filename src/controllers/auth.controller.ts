import { User } from "./../interfaces/user.interface";
import { service } from "./../services/auth.service";

class AuthController {

  static async signup(req, res, next) {
    try {
      //const user = await service.createUser(req.body);
      res.status(201).send('User created');
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const user: User = req.user;
      const token = service.signSessionToken(user);
      res.json({user, token});
    } catch (error) {
      next(error);
    }
  }

  static async recovery(req, res, next) {
    try {
      const { email }: User = req.body;
      const response = await service.sendRecovery(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { token, password } = req.body;
      const response = await service.changePassword(token, password);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
