import { service } from "./../services/orders.service";

class UserController {
  static async all(_req, res, next) {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async byUser(req, res, next) {
    try {
      const userId = req.user.sub;
      const orders = await service.findByUser(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const userId = req.user.sub;
      const newOrder = req.body;
      const orders = service.generateOrder(userId, newOrder);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
