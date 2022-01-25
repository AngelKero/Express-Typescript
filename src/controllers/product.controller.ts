import { Types } from "mongoose";
import { ProductService } from "./../services/product.service";
const service = new ProductService();
import boom from "@hapi/boom";

class ProductController {

  static async fake(req, res, next) {
    try {
      const { count } = req.query;
      const products = service.fake(Number(count) || 1);
      res.status(200).json({
        message: "Fake products",
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const body = req.body;
      const authorId: string = req.user.sub;
      const product = await service.create(authorId, body);
      res.status(201).json({
        message: `Product ${body?.name} created`,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async all(req, res, next) {
    try {
      const products = await service.all();
      res.status(200).json({
        totalProducts: products.length,
        products
      });
    } catch (error) {
      next(error);
    }
  }

  static async own(req, res, next) {
    try {
      const userId: string = req.user.sub;
      const products = await service.findByUser(userId);
      res.status(200).json({
        totalProducts: products.length,
        products
      });
    } catch (error) {
      next(error);
    }
  }

  static async one(req, res, next) {
    try {
      const { id } = req.params;
      const product = await service.findOne({_id: id});
      res.status(302).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const userId = req.user.sub;

      const product = await service.findOne({authorId: userId, _id: id});
      if (!product) throw boom.unauthorized(`You aren't allowed to update this product`);

      const productUpdated = await service.update(id, body);
      res.json({
        message: `Product ${id} updated`,
        data: productUpdated
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try{
      const { id } = req.params;
      const userId = req.user.sub;

      const product = await service.findOne({authorId: userId, _id: id});
      if (!product) throw boom.unauthorized(`You aren't allowed to update this product`);

      const productDeleted = await service.delete(id);
      res.json({
        message: `Product with id: ${id} was deleted`,
        data: productDeleted
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
