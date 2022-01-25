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


  async create(authorId: string, product: Product): Promise<Product> {
    try {
      const productModel = new ProductSchema({...product, authorId});
      const saved = await productModel.save();
      return saved.toObject();
    } catch (error) {
      throw boom.badImplementation(error);
    }
  }

  async findByUser(userId: string): Promise<Product[]> {
    try {
      const products = await ProductSchema.find({authorId: new Types.ObjectId(userId)});
      return products.map(product => product.toObject());
    } catch (error) {
      throw boom.badImplementation(error);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await ProductSchema.findById(id);
      return product.toObject();
    } catch (error) {
      throw boom.badImplementation(error);
    }
  }

  // async update(id: string, product: Product): void {

  // }

  // async partialUpdate(id: string, product: Product): void {

  // }

  // async delete(id: string): void {

  // }

}
