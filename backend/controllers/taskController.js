const taskModel = require('../models/taskModel.js');
const cron = require("node-cron");
const userModel = require('../models/userModel.js');


module.exports.deleteTasksCron = cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running midnight tasks deletion");
    await taskModel.deleteMany({});
    console.log('All tasks deleted successfully');
  } catch (err) {
    console.error("Failed to delete tasks at midnight");
  }
})


module.exports.addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id;
    const newTask = await taskModel.create({
      title,
      description,
      dueDate,
      user: userId
    });
    const user = await userModel.findById(userId);
    user.tasks.push(newTask._id);
    await user.save();

    res.status(200).json({ message: "Task created successfully!" });
    console.log(newTask);
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again" });
  }

};

module.exports.fetchTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskModel.find({ user: userId });
    if (tasks.length > 0) {
      return res.status(200).json({ tasks });
    } else {
      return res.status(404).json({ message: "No tasks found for this user." });
    }

  } catch (err) {
    res.status(401).json({ message: "Internal server error, please try again!" });
  }

};

module.exports.editTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, date } = req.body;

  try {

    const task = await taskModel.findOne({ _id: taskId });
    if (task) {
      const updatedTask = await taskModel.findOneAndUpdate({ _id: taskId }, { title, description, dueDate: date }, { new: true })
      res.status(200).json({ updatedTask })
    }
    else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again!" });
  }

};

module.exports.completeTask = async (req, res) => {
  const { taskId } = req.params;


  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      { isCompleted: true },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again!" });
  }
};


module.exports.toggleTaskCompletion = async (req, res) => {
  const { taskId } = req.params;
  const { isCompleted } = req.body;

  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      { isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Internal server error, please try again!" });
  }
};

module.exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskModel.findOne({ _id: taskId });
    if (task) {
      await taskModel.deleteOne({ _id: taskId });
      res.status(200).json({ message: "Task deleted successfully!" });
    } else {
      res.status(404).json({ message: "Task not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Inavlid server error, please try again later!" });
  }
};