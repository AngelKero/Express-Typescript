import express from "express";
import { MainRouter } from "./server.router";
import { logErrors, boomErrorHandler } from "./middlewares/error.handler";
import cors from "cors";
import boom from "@hapi/boom";
import config from "./config/config";

export class Server {
  port: string | number;
  app: express.Application;
  whiteList: string[];
  corsOptions: cors.CorsOptions;

  constructor() {
    this.port = config.port;
    this.app = express();

    this.middlewares();
    new MainRouter(this.app).routes();
    this.errorMiddlewares();
  }

  middlewares() {
    this.app.use(express.json());
    this.securityConfig();
  }

  securityConfig() {
    this.whiteList = ["http://localhost:3500", "http://localhost:5500"];
    this.corsOptions = {
      origin: (origin: string | null, callback: Function) => {
        if (this.whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(boom.forbidden("Origin not allowed"));
        }
      }
    };
    this.app.use(cors(this.corsOptions));
  }

  errorMiddlewares(): void {
    this.app.use(logErrors);
    this.app.use(boomErrorHandler);
  }

  corsValidation

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
    });
  }
}
