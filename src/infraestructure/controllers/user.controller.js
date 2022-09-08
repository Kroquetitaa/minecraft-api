const User = require('../schemas/user.schema.js');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/jwt.service.js');
const { setError } = require('../../utils/error/error.js');
const { status, messages } = require('../../utils/helpers/helpers.js');
const {
  Ok,
  Conflict,
  Created,
  Internal_Server_Error,
  Not_found,
  Unauthorized,
} = status;
const { notFound, succesLogin, successRegister, errorLogin, errorRegister, invalidPassword } =
  messages;

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const emailExist = await User.findOne({ email: newUser.email });
    const usernameExist = await User.findOne({ username: newUser.username });
    if (emailExist || usernameExist)
      return next(setError(Conflict, 'Username or Email already exist!'));
    const userInDB = await newUser.save();
    return res.json({
      status: Created,
      message: successRegister(),
      data: userInDB,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorRegister()));
  }
};

const login = async (req, res, next) => {
  try {
    const userInDB = await User.findOne({ email: req.body.email });
    if (!userInDB) return next(setError(Not_found, notFound('User')));
    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      const token = createToken(userInDB._id, userInDB.email);
      return res.json({
        status: Ok,
        message: succesLogin(),
        data: { userInDB, token },
      });
    } else {
      return next(setError(Unauthorized, invalidPassword()));
    }
  } catch (error) {
    return next(setError(Internal_Server_Error, error.message || errorLogin()));
  }
};

module.exports = { register, login };
