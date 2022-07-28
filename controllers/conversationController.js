const Conversation = require("../models/conversationModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const newConversation = await Conversation.create({
    members: [req.user, req.body.recipient],
  });

  res.status(201).json({
    status: "success",
    newConversation,
  });
});

exports.getConversation = catchAsync(async (req, res, next) => {
  let conversation;
  const existedConversation = await Conversation.findOne({
    members: { $all: [req.user, req.body.recipient] },
  }).populate("members");
  if (existedConversation) {
    conversation = existedConversation;
  } else {
    newConversation = await Conversation.create({
      members: [req.user, req.body.recipient],
    });
    conversation = await newConversation.populate("members");
  }

  res.status(200).json({
    conversation,
  });
});

exports.getConversationsOfUser = catchAsync(async (req, res) => {
  const conversations = await Conversation.find({
    members: { $in: [req.user] },
  }).populate("members");
  res.status(200).json({
    conversations,
  });
});
