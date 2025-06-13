const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  dueDate: {
    type: Date,
    default: () => {
      const now = new Date().toLocaleDateString();
      return now;
    },
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }

})

module.exports = mongoose.model('task', taskSchema);