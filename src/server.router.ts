import express, { Router } from "express";
import products from "./routes/products.router";
import defaultRoute from "./routes/default.router";
import users from "./routes/users.router";
import auth from "./routes/auth.router";
import profile from "./routes/profile.router";

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
        router: defaultRoute,
        path: "/"
      },
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
      },
      {
        router: profile,
        path: "/profile"
      }
    ];
  }

  routes(): void {
    this.paths.forEach(({ router, path }) => {
      this.router.use(path, router);
    });
  }
}
