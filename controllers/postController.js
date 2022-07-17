const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const newPost = new Post({ ...req.body, postedBy: req.user });
  await newPost.save();
  res.status(201).json({
    status: "success",
    newPost,
  });
});

exports.getPostList = catchAsync(async (req, res, next) => {
  const postList = await Post.find({ postedBy: [...req.user.friends] }).sort({
    createdAt: "desc",
  });

  res.status(200).json({
    status: "success",
    total: postList.length,
    postList,
  });
});
