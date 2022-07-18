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

    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numsLike: {
      type: Number,
      default: 0,
    },
    numsComment: {
      type: Number,
      default: 0,
    },

    postedBy: {
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

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "comments",
  })
    .populate({
      path: "postedBy",
    })
    .populate({
      path: "likedBy",
    });

  next();
});

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
  options: { sort: { createdAt: -1 } },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
