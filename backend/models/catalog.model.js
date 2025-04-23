import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["books", "research", "videos", "magazines"],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ["Hindi", "English", "Sanskrit"],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  coverUrl: {
    type: String,
    required: false
  },
  fileUrl: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
