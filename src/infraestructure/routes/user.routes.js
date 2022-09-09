const UsersRoutes = require('express').Router();
const rateLimit = require('express-rate-limit');
const { register, login } = require('../controllers/user.controller.js');
const RoutesUser = require('../api/routesUser.js');
const { pathRegister, pathLogin} = RoutesUser;

const userCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

UsersRoutes.post(pathRegister, [userCreateRateLimit], register );
UsersRoutes.post(pathLogin, login );

module.exports = UsersRoutes;