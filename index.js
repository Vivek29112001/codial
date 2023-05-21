const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookey
const session = require('express-session')
const passport = require('passport');
// const passportLocal = require('passport-local');
const passportLocal = require("./config/passport-local");
// var bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('express-dart-sass');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/scss',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// before the route call
app.use(expressLayouts);
// extractstyle and scripts from sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine(ejs file)
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production
    secret:'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(100 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove:'disabled'
    },
    function(err){
        console.loh(err|| 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running in port ${port}`);
});