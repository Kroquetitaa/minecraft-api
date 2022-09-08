const User = require("../schemas/user.schema.js");
const { verifyToken } = require("../services/jwt.service.js");
const { setError } = require("../../utils/error/error.js");

const authorize = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next(setError(401, "Unauthorize"));
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyToken(parsedToken, process.env.JWT_SECRET);
    if (!validToken) return next(setError(401, "Unauthorize"));
    const user = await User.findById(validToken.id);
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    return next(setError(401, 'Unathorize'));
  }
}

module.exports = { authorize }