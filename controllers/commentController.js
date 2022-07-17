const Comment = require("../models/commentModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Post = require("../models/postModel");

exports.create = catchAsync(async (req, res, next) => {
  const newComment = new Comment({
    content: req.body.content,
    post: req.body.post,
    commentBy: req.user,
  });
  newComment.save();
  await Post.findByIdAndUpdate(req.body.post, { $inc: { numsComment: 1 } });
  res.status(201).json({
    status: "success",
    newComment,
  });
});
