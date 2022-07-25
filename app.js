const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const friendRequestRouter = require("./routes/friendRequestRoutes");
const commentRouter = require("./routes/commentRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const conversationRouter = require("./routes/conversationRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

//ROUTES

app.use("/api/conversation", conversationRouter);
app.use("/api/friend-request", friendRequestRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/notification", notificationRouter);
//handle not existed routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
