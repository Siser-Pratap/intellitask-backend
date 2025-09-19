import express from "express";
import authRoutes from "./auth.js";
import adminRoutes from './admin.js';
import taskRoutes from './task.js';
import userRoutes from './user.js';

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

router.use('/task', taskRoutes);

router.use('/user', userRoutes);

export default router;
