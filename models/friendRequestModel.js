const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recepient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
module.exports = FriendRequest;
