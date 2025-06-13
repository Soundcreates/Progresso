const userModel = require("../models/userModel");



module.exports.getProgress = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findOne({ _id: userId }).populate('tasks');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tasks = user.tasks;

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }


    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.isCompleted === true).length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({ progress });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error, please try again later" });
  }
};
