const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        unique: true
    },
    last_name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmpassword: {
        type: String,
        require: true
    }

}, {
    timestamps: true
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;