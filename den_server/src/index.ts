import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

config();

const app: Express = express();
const server: HTTPServer = createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
  })
);

const PORT: string | 8080 = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log(`+ Client connected:\t${socket.id}`);
  socket.emit("message", "Hello from server");
  socket.on("disconnect", () => {
    console.log(`- Client disconnected:\t${socket.id}`);
  });
});

server.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
