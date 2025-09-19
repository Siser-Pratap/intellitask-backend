import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      companyId,
      workspaceId,
      taskName,
      description,
      assignedTo,
      status,
      priority,
      dueDate,
      createdBy,
    } = req.body;

    if (!companyId || !workspaceId || !taskName || !createdBy) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const task = new Task({
      companyId,
      workspaceId,
      taskName,
      description,
      assignedTo,
      status,
      priority,
      dueDate,
      createdBy,
    });

    await task.save();
    res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while creating task" });
  }
});


router.get("/", async (req, res) => {
  try {
    const { companyId, workspaceId } = req.query;

    const filter = {};
    if (companyId) filter.companyId = companyId;
    if (workspaceId) filter.workspaceId = workspaceId;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email status")
      .populate("createdBy", "name email");

    res.json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error fetching tasks" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email status")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ success: false, message: "Server error fetching task" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server error updating task" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error deleting task" });
  }
});

export default router;
