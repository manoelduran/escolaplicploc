import express from "express";
import { client } from "./database/index.js";
import { routes } from "./routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = 3336;
  }

  async init() {
    await client.connect();

    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(routes);
  }

  middlewares() {
    this.app.use(express.json());
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
