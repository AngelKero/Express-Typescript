import faker from "faker";
import { Product } from "src/interfaces/product.interface";
import boom from "@hapi/boom";

export class ProductService {

  products: Product[];

  constructor() {
    this.products = [];
    this.generate(100);
  }

  generate(size: number): void {
    const MAX_SIZE = 100;
    const limit = Number(size) > MAX_SIZE ? MAX_SIZE : size || 10;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.nature(1920, 1080),
        author: faker.animal.cat(),
        description: faker.lorem.lines(3),
        vendor: faker.company.companyName(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(product: Product): Promise<Product> {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
  }

  async findOne(id: string): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw boom.notFound();
    if (this.products[index].isBlock) throw boom.conflict('Product is blocked');

    return this.products[index];
  }

  async update(id: string, product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw boom.notFound();

    const oldProduct = this.products[index];
    const newProduct = { ...oldProduct, ...product };
    this.products[index] = newProduct;
    return this.products[index];
  }

  async partialUpdate(id: string, product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw boom.notFound();

    const oldProduct = this.products[index];
    const newProduct = { ...oldProduct, ...product };
    this.products[index] = newProduct;
    return this.products[index];
  }

  async delete(id: string): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw boom.notFound();

    const deleted = Object.assign({}, this.products[index]);
    this.products.splice(index, 1);
    return deleted;
  }

}
