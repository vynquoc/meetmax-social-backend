const Notification = require("../models/notificationModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  let newNotification = await Notification.create({
    content: req.body.content,
    type: req.body.type,
    url: req.body.url,
    createdBy: req.user,
    recipient: req.body.recipient,
  });
  newNotification = await newNotification.populate("recipient");

  res.status(201).json({
    status: "success",
    newNotification,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const newNotification = await Notification.findByIdAndUpdate(
    req.params.id,
    {
      isRead: true,
    },
    { new: true }
  ).populate("createdBy");

  res.status(200).json({
    status: "success",
    newNotification,
  });
});

exports.getNotificationList = catchAsync(async (req, res) => {
  const notificationList = await Notification.find({
    recipient: req.user,
  })
    .populate("createdBy")
    .sort({ createdAt: -1 });

  res.status(200).json({
    total: notificationList.length,
    notificationList,
  });
});
