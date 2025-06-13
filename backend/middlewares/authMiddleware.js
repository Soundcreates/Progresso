const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Not authorised!");
  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Invalid or expired session!'
    });
  }
}

module.exports = authMiddleware