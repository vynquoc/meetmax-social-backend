const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Access-Control-Header",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods",
    ],
    credentials: true,
  },
});

server.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(process.env.NODE_ENV);
});

//handle rejection ex: connect db failed (wrong password)
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
