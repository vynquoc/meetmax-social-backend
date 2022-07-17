const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "commentBy",
    select: "firstName lastName username",
  });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
