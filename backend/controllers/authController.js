const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');
require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY

module.exports.registerController = async (req, res) => {

  try {
    const body = req.body;

    const hashedPass = await bcrypt.hash(body.password, 10);
    console.log(hashedPass);//10 is the salting
    const newUser = await userModel.create({
      fullname: body.fullname,
      email: body.email,
      password: hashedPass,
    })
    console.log(newUser);

    const token = jwt.sign(
      { fullname: body.fullname, email: body.email },
      JWT_KEY,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      message: "User SignUp Sucessful",
      fullname: body.fullname,
      token: token,
    });
  } catch (signup_error) {
    console.log(signup_error);
    return res.status(500).json({ status: "Something went wrong, please try again later." })
  }


};

module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const isValidPassword = await bcrypt.compare(password, existingUser.password);
      if (isValidPassword) {
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_KEY, { expiresIn: "1h" });
        res.cookie('token', token);
        console.log('User logged in!');
        return res.status(200).json({ message: "Logged in successfully" })
      }
      else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(404).json({ message: 'No user found with such credentials, please register' });

    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.getMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id);
    const username = user.fullname;
    res.status(200).json({ user: decoded, username });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
