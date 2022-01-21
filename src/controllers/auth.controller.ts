import { User } from "./../interfaces/user.interface";
import { service } from "./../services/auth.service";

class AuthController {
  static async login(req, res, next) {
    try {
      const user: User = req.user;
      res.json(service.signToken(user));
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
