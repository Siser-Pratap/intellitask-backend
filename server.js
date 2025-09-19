// server.js
import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/api", routes);


app.get("/", (req, res) => {
  res.send("Welcome to my Express backend (ESM)!");
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
