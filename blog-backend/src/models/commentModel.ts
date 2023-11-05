const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Comment can not be empty"],
  },
  date: {
    type: Date,
    default: Date.now(),
    // required: true, // Tutorial instructor and not in Graphql Schema
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
