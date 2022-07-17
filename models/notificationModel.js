const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    content: {
      type: String,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// postSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "comments",
//   }).populate({
//     path: "postedBy",
//   });

//   next();
// });

// postSchema.virtual("comments", {
//   ref: "Comment",
//   foreignField: "post",
//   localField: "_id",
// });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
