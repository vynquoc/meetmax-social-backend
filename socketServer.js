let users = [];

const SocketServer = (socket) => {
  socket.on("connect-user", (user) => {
    users.push({ ...user, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`[DISCONNECTED]: ${socket.id}`);
    users = users.filter((user) => user.socketId !== socket.id);
  });

  //SEND FRIEND REQUEST
  socket.on("send-friend-request", (recipient) => {
    const recipientUser = users.find((user) => user.id === recipient);
    if (recipientUser) {
      socket.to(recipientUser.socketId).emit("have-noti", "Adasd");
    }
  });

  //NOTIFICATION
  socket.on("send-comment-notification", (notification) => {
    const recipient = users.find(
      (user) => user.id === notification.recipient.id
    );
    if (recipient) {
      socket
        .to(recipient.socketId)
        .emit("push-comment-notification", notification);
    }
  });

  socket.on("send-like-notification", (notification) => {
    const recipient = users.find(
      (user) => user.id === notification.recipient.id
    );
    if (recipient) {
      socket
        .to(recipient.socketId)
        .emit("push-like-notification", notification);
    }
  });

  //MESSAGE
  socket.on("send-message", (data) => {
    const recipient = users.find((user) => user.id === data.recipient.id);
    if (recipient) {
      socket.to(recipient.socketId).emit("receive-message", data.newMessage);
    }
  });
};

module.exports = SocketServer;
