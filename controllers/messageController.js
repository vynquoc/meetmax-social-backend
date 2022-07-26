const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create({
    conversationId: req.body.conversationId,
    content: req.body.content,
    sender: req.user,
  });

  const updatedConversation = await Conversation.findByIdAndUpdate(
    req.body.conversationId,
    { lastMessage: newMessage },
    { new: true }
  ).populate("members");
  if (!newMessage) return next(new AppError("Something wrongs", 500));
  res.status(201).json({
    status: "success",
    newMessage,
    updatedConversation,
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  }).populate("sender");

  res.status(200).json({
    messages,
  });
});
