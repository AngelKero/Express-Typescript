import { Server } from "./server";
import env from "dotenv";
env.config();

const server = new Server();
server.listen();
