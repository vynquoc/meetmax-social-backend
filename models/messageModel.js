const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    content: {
      type: String,
    },
    sender: {
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

// newsSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'comments'

//     }).populate({
//         path: 'createdBy'
//     })
//     next()
// })

// newsSchema.virtual("comments", {
//   ref: "Comment",
//   foreignField: "news",
//   localField: "_id",
// });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
