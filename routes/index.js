// routes/index.js
import { Router } from "express";

const router = Router();

// Example route
router.get("/hello", (req, res) => {
  res.json({ message: "Hello from API!" });
});

export default router;
