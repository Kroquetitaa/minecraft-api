const UsersRoutes = require('express').Router();
const rateLimit = require('express-rate-limit');
const {authorize} = require('../middleware/auth.js');
const { register, login } = require('../controllers/user.controller.js');

const userCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

UsersRoutes.post('/register', [userCreateRateLimit], register );
UsersRoutes.post('/login', login );

module.exports = UsersRoutes;