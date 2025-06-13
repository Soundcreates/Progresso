const taskModel = require('../models/taskModel.js');
const userModel = require('../models/userModel.js');


module.exports.getCalendar = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findOne({ _id: userId }).populate('tasks');
    if (!user) res.status(404).json({ message: "User not found" });

    const calendarTasks = user.tasks.map(task => ({
      title: task.title,
      dueDate: task.dueDate,
      isCompleted: task.isCompleted,
    }));

    res.status(200).json(calendarTasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again later" });

  };

};
