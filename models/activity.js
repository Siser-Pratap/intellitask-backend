// models/Activity.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["created", "updated", "completed", "commented"],
      required: true,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task", 
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company", 
    }
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
