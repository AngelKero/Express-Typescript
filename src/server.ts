import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import boom from "@hapi/boom";
import { MainRouter } from "./server.router";
import { logErrors, boomErrorHandler } from "./middlewares/error.handler";
import config from "./config/config";
import db from "./db/index";

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
    this.app.use(express.urlencoded({ extended: true }));
    this.sessionConfig();
    this.securityConfig();
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  sessionConfig(): void {
    this.app.use(
      session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: false,
        cookie: {
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        },
        store: MongoStore.create({
          // @ts-ignore TS2322
          clientPromise: db.getClient().connect(),
          collectionName: 'sessions',
          ttl: 7 * 24 * 60 * 60,
          autoRemove: 'native'
        })
      })
    );
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
    this.app.use(helmet());
  }

  errorMiddlewares(): void {
    !config.isProd && this.app.use(logErrors);
    this.app.use(boomErrorHandler);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
    });
  }
}
