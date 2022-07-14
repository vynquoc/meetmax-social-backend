const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { default: validator } = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Tài khoản đã tồn tại"],
      minlength: [8, "Tài khoản phải có ít nhất 8 kí tự"],
      required: [true, "Tài khoản không được để trống"],
    },
    firstName: {
      type: String,
      required: [true, "Họ và tên không được để trống"],
    },
    lastName: {
      type: String,
      required: [true, "Họ và tên không được để trống"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email không được để trống",
      validate: [validator.isEmail, "Email không hợp lệ"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [8, "Mật khẩu phải có ít nhất 8 kí tự"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        //only work on CREATE and on Save
        validator: function (el) {
          return el === this.password;
        },
        message: "Mật khẩu không trùng khớp",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // run only when password is modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.index({ name: "text" });
//check password in log in
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
