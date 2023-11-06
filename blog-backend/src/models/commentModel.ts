const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Comment can not be empty"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
