const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  sentRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  recievedRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
  }]
})

module.exports = mongoose.model('user', userSchema);