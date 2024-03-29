import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { studentRouter } from "./route/student.route";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.route();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(express.json({limit: '50mb'}));
    this.app.use(cors());
  }

  route() {
    this.app.use("/student", studentRouter);
  }
}

export default new App().app;
