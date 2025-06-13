const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const homeRouter = require('./routes/homeRouter.js');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { deleteTasksCron } = require('./controllers/taskController.js');

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', homeRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB and listening on port 8000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
