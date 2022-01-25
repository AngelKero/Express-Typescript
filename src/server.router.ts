import express, { Router } from "express";
import products from "./routes/products.router";
import users from "./routes/users.router";
import auth from "./routes/auth.router";

interface IRouter {
  router: Router;
  path: string;
}

export class MainRouter {
  router: Router;
  paths: IRouter[];

  constructor(app: express.Application) {
    this.router = express.Router();
    // Api route
    app.use('/api/v1', this.router);

    // Entities routes
    this.paths = [
      {
        router: products,
        path: "/products"
      },
      {
        router: users,
        path: "/users"
      },
      {
        router: auth,
        path: "/auth"
      }
    ];
  }

  routes(): void {
    this.paths.forEach(({ router, path }) => {
      this.router.use(path, router);
    });
  }
}
