import { Router } from "express";
import { taskController } from "../controller/task.controller";

class IpRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/fetch-ip", taskController.logIpAddress);
  }
}

const ipRouter = new IpRouter().router;
export default ipRouter;
