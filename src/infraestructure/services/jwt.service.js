const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "2d" });
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createToken, verifyToken }