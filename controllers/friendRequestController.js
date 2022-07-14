const FriendRequest = require("../models/friendRequestModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const newRequest = new FriendRequest({
    requester: req.body.requester,
    recipient: req.body.recipient,
  });
  await newRequest.save();
  res.status(201).json({
    status: "success",
    newRequest,
  });
});
