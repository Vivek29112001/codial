const User = require('../models/user');

// lets keep it same before 
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
}



module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}

// render sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');

    }

    return res.render('user_sign_up', {
        title: "Codial | Sign Up",
    })
}


// render sign in page
module.exports.signIn = function (req, res) {
    // console.log(req.user);
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_In', {
        title: "Codial | Sign In"
    })
}

// get the signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}

//sign in and crerate a session for the user
module.exports.createSession = function (req, res) {

    // return res.redirect('/');
    // steps to authenticate
    // find the user
    // User.findOne({ email: req.body.email }, function (err, user) {
    //     if (err) { console.log('error in creating user while signing in'); return }
    //     // handle user found

    //     if (user) {
    //         // handle password which don't match
    //         if (user.password != req.body.password) {
    //             return res.redirect('back');
    //         }
    //         // handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');
    //     } else {
    //         // handle if user not found

    //         return res.redirect('back');
    //     }


    // });

    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out Successfully')
    
    return res.redirect('/');
}