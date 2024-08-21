import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./framework/webservices/routes/users";
import authRoutes from "./framework/webservices/routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Serve static files from the frontend build directory
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Handle all other routes by serving the frontend's index.html
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


app.listen(7000, () => {
  console.log("server is running on port 7000");
});
