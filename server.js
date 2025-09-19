// server.js
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Welcome to my Express backend (ESM)!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
