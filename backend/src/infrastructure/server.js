import express from "express";
import { cors } from "../middlewares/cors.js";
import { routes } from "./routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = 3336;
  }

  async init() {
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(routes);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server listening on port ${this.port}`)
    );
  }
}

const server = new Server();

server.init();
server.listen();
