import { ProductService } from "./../services/product.service";
const service = new ProductService();

class ProductController {
  static async all(_req, res, next) {
    try {
      const products = await service.find();
      res.status(200).json({
        totalProducts: products.length,
        products
      });
    } catch (error) {
      next(error);
    }
  }

  static async filter(req, res, next) {
    res.status(200).send('Filtered products');
  }

  static async one(req, res, next) {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(302).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const body = req.body;
      const product = await service.create(body);
      res.status(201).json({
        message: `Product ${body?.name} created`,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: `Product ${id} updated`,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.partialUpdate(id, body);
      res.json({
        message: `Product ${id} updated`,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try{
      const { id } = req.params;
      const product = await service.delete(id);
      res.json({
        message: `Product ${id} deleted`,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
