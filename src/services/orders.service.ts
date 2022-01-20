import faker from "faker";
import boom from "@hapi/boom";
import { Order } from "src/interfaces/order.interface";
import { service as userService } from "./users.service";

class OrdersService {
  orders: Order[];

  constructor() {
    this.orders = [];
    this.generate(100);
  }

  generate(size: number): void {
    const MAX_SIZE = 100;
    const limit = Number(size) > MAX_SIZE ? MAX_SIZE : size || 10;
    for (let i = 0; i < limit; i++) {
      this.orders.push({
        id: faker.datatype.uuid(),
        userId: userService.users[faker.datatype.number(userService.users.length - 1)].id,
        productId: faker.datatype.uuid(),
        quantity: faker.datatype.number(10),
        total: faker.datatype.number(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
      });
    }
  }

  generateOrder(userId: string, newOrder: Order): Order {
    const orderToCreate = {
      ...newOrder,
      id: faker.datatype.uuid(),
      userId: userId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    }
    this.orders.push(orderToCreate);

    return this.orders.find(order => order.id === orderToCreate.id);
  }

  async find(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.orders);
      }, 1000);
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    const orders = this.orders.filter(order => order.userId === userId);
    if (orders.length === 0) throw boom.notFound(`There is no orders with userId: ${userId}`);

    return orders;
  }

}

export const service = new OrdersService();
