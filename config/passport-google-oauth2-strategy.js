const passport = require('passport');
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { Console } = require('console');


// tell passport to use a new stategy for google login
passport.use(new googleStrategy({
    clientID: "519512947792-9qr0sgfd852eg89u06a689gprmde66q2.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},

    function (accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function (err, user) {
                if (err) { console.log('error in google strategy-passport', err); return; }

                console.log(profile);

                if (user) {
                    // if found set this user as req.user
                    return done(null, user);
                } else {
                    // if not found create a user and set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, function (err, user) {
                        if (err) { console.log('error in creating user google strategy-passport', err); return; }

                        return done(null, user);
                    }
                    )
                }
            })
        
    }


))

module.exports=passport;