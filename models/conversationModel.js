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

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
