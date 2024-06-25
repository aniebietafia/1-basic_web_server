import { Router } from "express";
import ipRouter from "./task.route";

class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.use("/api", ipRouter);
  }
}

const indexRouter = new IndexRouter().router;
export default indexRouter;
