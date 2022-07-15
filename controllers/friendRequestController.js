const FriendRequest = require("../models/friendRequestModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.create = catchAsync(async (req, res, next) => {
  const newRequest = new FriendRequest({
    requester: req.user,
    recipient: req.body.recipient,
  });
  await newRequest.save();
  res.status(201).json({
    status: "success",
    newRequest,
  });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await FriendRequest.findOneAndUpdate(
    { requester: req.body.requester },
    { recipient: req.user },
    { status: "accepted" },
    { new: true }
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
    { requester: req.body.requester },
    { recipient: req.user },
    { status: "rejected" }
  );
  res.status(200).json({
    friendRequest,
  });
});
