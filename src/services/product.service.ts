import { Product } from "src/interfaces/product.interface";
import boom from "@hapi/boom";
import ProductSchema from "./../db/models/products.model";
import { Types } from "mongoose";
import faker from "faker";

export class ProductService {

  constructor() {
  }

  fake(count: number): Product[] {
    const products: Partial<Product>[] = [];
    for (let i = 0; i < count; i++) {
      const product: Partial<Product> = {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.image(),
        description: faker.lorem.paragraph(),
        vendor: faker.company.companyName(),
        isBlock: faker.datatype.boolean()
      };
      products.push(product);
    }
    return products as Product[];
  }

  async all(): Promise<Product[]> {
    try {
      const products = await ProductSchema.find();
      return products.length > 0 ? products.map(product => product.toObject()) : null;
    } catch (error) {
      throw boom.notFound(error);
    }
  }

  async create(authorId: string, product: Product): Promise<Product> {
    try {
      const productModel = new ProductSchema({...product, authorId});
      const saved = await productModel.save();
      return saved ? saved.toObject() : null;
    } catch (error) {
      throw boom.badImplementation(error);
    }
  }

  async findByUser(userId: string): Promise<Product[]> {
    try {
      const products = await ProductSchema.find({authorId: new Types.ObjectId(userId)});
      return products.length > 0 ? products.map(product => product.toObject()) : null;
    } catch (error) {
      throw boom.notFound(error);
    }
  }

  async findOne(query: Partial<Product>): Promise<Product> {
    try {
      const product = await ProductSchema.findOne(query);
      return product ? product.toObject(): null;
    } catch (error) {
      throw boom.badImplementation(error);
    }
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    try {
      const updated = await ProductSchema.findByIdAndUpdate(id, data, {new: true});
      return updated ? updated.toObject(): null;
    } catch (error) {
      throw boom.notFound(error);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const deleted = await ProductSchema.findByIdAndDelete(id);
      return deleted ? deleted.toObject(): null;
    } catch (error) {
      throw boom.notFound(error);
    }
  }

}
