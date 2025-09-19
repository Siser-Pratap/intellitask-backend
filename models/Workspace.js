import mongoose from "mongoose";

const { Schema } = mongoose;

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    taskId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
