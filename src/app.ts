import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

import routes from "./routes/index.route";

// instanciate express app
const app: express.Application = express();

// define a route
app.use("/", routes);

// setup middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes

// define index route
app.get("/", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "Hello World",
  });
});

// define not found route
app.all("*", (_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Resource not found",
  });
});

// global error handler
app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
});

export default app;
