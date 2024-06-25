import http from "node:http";
import dotenv from "dotenv";
dotenv.config();

import app from "./app";

// set port
const PORT: string | number = process.env["PORT"] || 8080;

app.set("port", PORT);

// create server
export const server: http.Server = http.createServer(app);

// listen
export const start = (): void => {
  try {
    server.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
    server.on("error", (error: Error) => {
      throw new Error(`Error: ${error}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();

// gracefully shutdown
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
