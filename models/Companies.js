import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    userId: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    workspace:[{type: mongoose.Schema.Types.ObjectId, required: true}],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],



},{timestamps:true});

const Company = mongoose.model("Company", companySchema);
export default Company;