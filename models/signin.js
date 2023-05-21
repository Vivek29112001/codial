const mongoose = require('mongoose');

const signinSchema = new mongoose.Schema({
    email: {
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
},{
    timestamps:true
});

const Signin = mongoose.model('Signin', signinSchema);

module.exports = Signin;