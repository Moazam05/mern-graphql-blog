const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Blog must have a name"],
    unique: true,
  },
  content: {
    type: String,
    required: [true, "A Blog must have a content"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
