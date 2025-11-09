import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 7216;

connectDB();

const app = express();

app.use(express.json()); // Parse incoming requests:req.body
app.use(cookieParser()); // Parse incoming cookies

app.get("/test", (req, res) => {
  res.send("Connected!");
});

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
