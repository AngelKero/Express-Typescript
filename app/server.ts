import express from "express";
import products from "./routes/products.route";

export class Server {
  port: string | number;
  app: express.Application;
  paths: { [index: string]: string };

  constructor() {
    this.port = process.env.PORT || 3000,
    this.app = express(),
    this.paths = {
      products: "/api/products",
      users: "/api/users",
      categories: "/api/categories"
    };
    this.routes();
  }

  routes(): void {
    this.app.use(this.paths.products, products)
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}
