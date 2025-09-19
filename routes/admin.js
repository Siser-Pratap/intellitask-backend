import express from 'express';
import Company from '../models/Companies.js';
import User from '../models/User.js';


const router = express.Router();

const STATUS_ORDER = {
  Online: 1,
  Away: 2,
  Busy: 3,
};

router.get("/:companyId/total-users", async(req, res)=>{

    try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const userCount =Company.userId.length;

    res.json({
      companyId,
      totalUsers: userCount,
    });

  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:companyId/total-workspace", async(req, res)=>{

    try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const workspaceCount = Company.workspace.length;

    res.json({
      companyId,
      totalWorkspace: workspaceCount,
    });

  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:companyId/tasks-summary", async (req, res) => {
  try {
    const { companyId } = req.params;

    
    const pendingCount = await Task.countDocuments({
      companyId,
      status: { $in: ["pending"] }
    });

    const completedCount = await Task.countDocuments({
      companyId,
      status: "completed"
    });

    res.json({
      success: true,
      companyId,
      pendingTasks: pendingCount,
      completedTasks: completedCount,
    });
  } catch (err) {
    console.error("Error fetching tasks summary:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/:companyId/activity", async (req, res) => {
  try {
    const { companyId } = req.params;

    const activities = await Activity.find({ companyId })
      .populate("userId", "name email") 
      .populate("taskId", "taskName status") 
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching activities",
    });
  }
});

router.get("/:companyId/notifications", async (req, res) => {
  try {
    const { companyId } = req.params;

    const notifications = await Notification.find({ companyId })
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching notifications",
    });
  }
});

router.get("/:companyId/status", async (req, res) => {
  try {
    const { companyId } = req.params;

    let users = await User.find({ companyId });

    users = users.sort((a, b) => {
      return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching users",
    });
  }
});

router.get("/:companyId/stats/created_completed", async(req, res)=>{
   try {
    const { companyId } = req.params;
    const { date } = req.query; 

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const createdCount = await Task.countDocuments({
      companyId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const completedCount = await Task.countDocuments({
      companyId,
      status: "completed",
      updatedAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({
      success: true,
      date,
      companyId,
      createdTasks: createdCount,
      completedTasks: completedCount,
    });
  } catch (error) {
    console.error("Error fetching task stats:", error);
    res.status(500).json({ success: false, message: "Server error fetching stats" });
  }
});

export default router;






