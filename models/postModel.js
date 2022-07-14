const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
    },
    photo: {
      type: String,
    },
    numsLike: {
      type: Number,
    },
    numsComment: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
