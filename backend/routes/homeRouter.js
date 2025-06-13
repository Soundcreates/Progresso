const express = require('express');
const route = express.Router();
const { registerController, loginController } = require('../controllers/authController.js');
const middleware = require('../middlewares/authMiddleware.js');
const { addTask, fetchTask, editTask, completeTask, deleteTask, toggleTaskCompletion } = require('../controllers/taskController.js');
const { sendRequest, acceptRequest, rejectRequest, cancelRequest, getFriends } = require('../controllers/friendController.js');
const { getProgress } = require('../controllers/progressController.js');
const { getCalendar } = require('../controllers/calendarController.js');
const { getMe } = require('../controllers/authController.js');



route.post('/register', registerController);

route.post('/login', loginController);

route.post('/tasks', middleware, addTask);

route.get('/tasks/:userId', middleware, fetchTask);

route.put('/tasks/:taskId', middleware, editTask);

route.patch('/tasks/complete/:taskId', middleware, completeTask);

route.patch('/tasks/toggle/:taskId', middleware, toggleTaskCompletion);

route.delete('/tasks/:taskId', middleware, deleteTask);

route.post('/send-request/:recieverId', middleware, sendRequest);

route.post('/accept-request/:senderId', middleware, acceptRequest);

route.delete('/reject-request/:senderId', middleware, rejectRequest);

route.delete('/cancel-request/:recieverId', middleware, cancelRequest);

route.get('/requests/:userId', middleware, getFriends);

route.get('/tasks/progress/:userId', middleware, getProgress);

route.get('/tasks/calendar/:userId', middleware, getCalendar);


route.get('/me', middleware, getMe);

module.exports = route;