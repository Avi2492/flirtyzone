import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messagesRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running at ${PORT}`);
});
