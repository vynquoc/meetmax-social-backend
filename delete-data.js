const Notification = require("./models/notificationModel");

const deleteData = async () => {
  const dataSet = await Notification.find();
  console.log(dataSet);
  const arr = dataSet.map((dat) => dat.id);
  console.log(arr);
  //   await Notification.deleteMany({ _id: { $in: arr } });
};

deleteData();
