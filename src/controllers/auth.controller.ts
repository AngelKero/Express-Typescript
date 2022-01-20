import { User } from "./../interfaces/user.interface";
import { signToken } from "./../utils/token.sign";

class AuthController {
  static async login(req, res, next) {
    const user: User = req.user;
    const payload = {
      sub: user.id,
      role: user.role
    };
    res.json({
      user,
      token: signToken(payload)
    });
  }
}

export default AuthController;
