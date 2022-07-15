const User = require("../models/userModel");
const FriendRequest = require("../models/friendRequestModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const dateOfBirth = new Date(req.body.dateOfBirth);
  const newUser = new User({ ...req.body, dateOfBirth });
  await newUser.save();
  res.status(201).json({
    status: "success",
    newUser,
  });
});

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  const isFriend = user.friends.some((friend) => friend.equals(req.user.id));
  let isRecepient, isRequester;
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!isFriend) {
    isRequester = await FriendRequest.findOne({
      requester: user,
      recipient: req.user,
      status: "pending",
    });
    isRecepient = await FriendRequest.findOne({
      requester: req.user,
      recepient: user,
      status: "pending",
    });
  }

  res.status(200).json({
    data: {
      user,
      isFriend,
      isRecepient: isRecepient ? true : false,
      isRequester: isRequester ? true : false,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  console.log(req.body.active);
  const active = req.body.active === "true" ? true : false;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body, active: active },
    { new: true }
  );
  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User Updated!",
    updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User deleted!",
    deletedUser,
  });
});
