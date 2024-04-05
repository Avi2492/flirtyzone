import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socketServer.js";

const PORT = process.env.PORT || 3002;

dotenv.config();
app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messagesRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running at ${PORT}`);
});
