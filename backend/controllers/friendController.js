const userModel = require('../models/userModel.js');

module.exports.sendRequest = async (req, res) => {
  const recieverId = req.params.recieverId;
  const senderId = req.user.id;

  try {

    const user = await userModel.findOne({ _id: senderId });
    const reciever = await userModel.findOne({ _id: recieverId });

    user.sentRequests.push(recieverId);
    await user.save();
    reciever.recievedRequests.push(senderId);
    await reciever.save();

    res.status(200).json({ message: "Friend request sent!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later" });
  }
};

module.exports.acceptRequest = async (req, res) => {
  const senderId = req.params.senderId;
  const recieverId = req.user.id;

  try {

    const reciever = await userModel.findOne({ _id: recieverId });
    const sender = await userModel.findOne({ _id: senderId });

    reciever.friends.push(senderId);
    reciever.recievedRequests = reciever.recievedRequests.filter(id => id !== senderId);
    await reciever.save();

    sender.friends.push(recieverId);
    sender.sentRequests = sender.sentRequests.filter(id => id !== recieverId)
    await sender.save();
    res.status(200).json({ message: "Friend request accepted!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later" });
  }
};

module.exports.rejectRequest = async (req, res) => {
  const senderId = req.params.senderId;
  const recieverId = req.user.id;

  try {
    const reciever = await userModel.findOne({ _id: recieverId });
    const sender = await userModel.findOne({ _id: senderId });

    reciever.recievedRequests = reciever.recievedRequests.filter(id => id !== senderId);
    await reciever.save();

    sender.sentRequests = sender.sentRequests.filter(id => id !== recieverId)
    await sender.save();

    res.status(200).json({ message: "Rejected friend request!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later" });
  }

};

module.exports.cancelRequest = async (req, res) => {
  const recieverId = req.params.id;
  const senderId = req.user.id;

  try {
    const reciever = await userModel.findOne({ _id: recieverId });
    const sender = await userModel.findOne({ _id: senderId });

    sender.sentRequests = sender.sentRequests.filter(id => id !== recieverId)
    await sender.save();

    reciever.recievedRequests = reciever.recievedRequests.filter(id => id !== senderId);
    await reciever.save();

    res.status(200).json({ message: "Cancelled request successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later" });
  }
};

module.exports.getFriends = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUser = await userModel.findOne({ _id: userId }).populate({
      path: 'friends',
      populate: {
        path: 'tasks',
        select: 'isCompleted'
      },
      select: 'fullname email tasks',
    });
    const friends = currentUser.friends.map(friend => {
      const totalTasks = friend.tasks.length;
      const completedTasks = friends.tasks.filter(task => task.isCompleted);
      const progress = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

      return {
        _id: friend._id,
        fullname: friend.fullname,
        email: friend.email,
        progress,
      }
    })

    if (friends && friends.length > 0) {
      res.status(200).json({ friends });
    } else {
      res.status(404).json({ message: "No friends found!" });
    }

  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later" });
  }
};

