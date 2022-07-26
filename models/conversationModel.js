const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

conversationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "lastMessage",
  });
  next();
});

// newsSchema.virtual("comments", {
//   ref: "Comment",
//   foreignField: "news",
//   localField: "_id",
// });

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
