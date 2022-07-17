const FriendRequest = require("../models/friendRequestModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.create = catchAsync(async (req, res, next) => {
  console.log(req.body.recepient);
  const newRequest = new FriendRequest({
    requester: req.user,
    recepient: req.body.recepient,
  });
  await newRequest.save();
  res.status(201).json({
    status: "success",
    newRequest,
  });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await FriendRequest.findOneAndUpdate(
    { requester: req.body.requester, recipient: req.user },

    { status: "accepted" }
  );
  if (friendRequest) {
    const recipient = req.user;
    const requester = friendRequest.requester;
    await User.findByIdAndUpdate(recipient.id, {
      $push: { friends: requester },
    });
    await User.findByIdAndUpdate(requester._id, {
      $push: { friends: recipient },
    });
  }
  res.status(200).json({
    friendRequest,
  });
});

exports.rejectRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await FriendRequest.findOneAndUpdate(
    { requester: req.body.requester, recipient: req.user },
    { status: "rejected" }
  );
  res.status(200).json({
    friendRequest,
  });
});

exports.cancelRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await FriendRequest.findOneAndDelete({
    requester: req.user,
    recepient: req.body.recepient,
  });
  if (!friendRequest) return next(new Error("No friend request found !", 404));
  res.status(200).json({
    friendRequest,
  });
});

exports.unfriend = catchAsync(async (req, res, next) => {
  const firstUser = await User.findByIdAndUpdate(req.user.id, {
    $pull: { friends: req.body.userToUnfriend },
  });
  const secondUser = await User.findByIdAndUpdate(req.body.userToUnfriend, {
    $pull: { friends: req.user.id },
  });

  res.status(200).json({
    status: "Unfriend successfully",
  });
});
