import express, { Router } from "express";
import products from "./routes/products.router";
import defaultRoute from "./routes/default.router";
import users from "./routes/users.router";

export class MainRouter {
  router: Router;
  paths: { [index: string]: string };

  constructor(app: express.Application) {
    this.router = express.Router();
    // Api route
    app.use('/api/v1', this.router);

    // Entities routes
    this.paths = {
      default: "/",
      products: "/products",
      users: "/users",
      categories: "/categories"
    };
  }

  routes(): void {
    this.router.use(this.paths.default, defaultRoute);
    this.router.use(this.paths.products, products);
    this.router.use(this.paths.users, users);
  }
}
