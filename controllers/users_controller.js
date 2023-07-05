const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// lets keep it same before 
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
}



module.exports.update = async function (req, res) {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {

        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
                if(err) {console.log('*****Multer Error', err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/'+ req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });


        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401). send('Unauthorized');
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