const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ObjectId = require("mongoose").Types.ObjectId;

exports.create = catchAsync(async (req, res, next) => {
  const newPost = new Post({ ...req.body, postedBy: req.user });
  await newPost.save();
  res.status(201).json({
    status: "success",
    newPost,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return new AppError("Not found", 404);
  }
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.addLike = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { likedBy: req.user },
      $inc: { numsLike: 1 },
    },
    { new: true }
  );

  if (!post) return next(new AppError("No post found", 404));
  res.status(200).json({
    status: "success",
    updatedPost: post,
  });
});

exports.unlike = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likedBy: new ObjectId(req.user.id) },
      $inc: { numsLike: -1 },
    },
    { new: true }
  );
  if (!post) return next(new AppError("No post found", 404));
  res.status(200).json({
    status: "success",
    updatedPost: post,
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
