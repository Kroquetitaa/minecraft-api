const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/error/error.js');
const { validationPassword } = require('../../utils/validations/validation.js');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    }, 
    {
        timestamps: true,
    }
);

UserSchema.pre( 'save', function(next) {
    if(!validationPassword( this.password )) return next(setError(400, 'INVALID PASSWORD'));
    this.password = bcrypt.hashSync( this.password, 16 );
    next();
});

module.exports = mongoose.model( 'users', UserSchema );