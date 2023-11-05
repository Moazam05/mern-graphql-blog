const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Blog must have a name"],
  },
  content: {
    type: String,
    required: [true, "A Blog must have a content"],
  },
  date: {
    type: Date,
    default: Date.now(),
    // required: true, // Tutorial instructor
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
