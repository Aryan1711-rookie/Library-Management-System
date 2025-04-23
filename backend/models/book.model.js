import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    enum: ["PDF", "E-Book", "Lecture Notes"],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Book', bookSchema);