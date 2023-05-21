const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codial_develpoment');
// localhost:27017 is not working in node version 18 so use localhost address in place of it that is 127.0.0.1

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to MongoDB"));


db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;