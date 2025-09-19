import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/:userId/:companyId", async (req, res) => {
  try {
    const { userId, companyId } = req.params;

    const completed_tasks = await Task.find({
      companyId,
      assignedTo: userId,
      status:"completed", 
    })
      .populate("workspaceId", "name") 
      .populate("assignedTo", "name email") 
      .populate("createdBy", "name email"); 

    const pending_tasks = await Task.find({
      companyId,
      assignedTo: userId,
      status:"pending", 
    })
      .populate("workspaceId", "name") 
      .populate("assignedTo", "name email") 
      .populate("createdBy", "name email"); 

    res.json({
      success: true,
      completed_tasks:completed_tasks,
      pending_tasks:pending_tasks,
    });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ success: false, message: "Server error fetching tasks" });
  }
});

export default router;
