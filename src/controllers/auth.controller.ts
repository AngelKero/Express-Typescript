import { User } from "./../interfaces/user.interface";
import { service } from "./../services/auth.service";
import { service as userService } from "./../services/users.service";

class AuthController {

  static async signup(req, res, next) {
    try {
      let user = await userService.create(req.user._id, req.body);
      const token = service.signSessionToken(user);

      res.status(201).json({message: 'User created', user, token});
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const user: User = req.user;
      const token = service.signSessionToken(user);

      res.json({user,token});
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
