const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25)

    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "Codieal | HOme",
    //         posts: posts
    //     })
    // });

    try {
        // populate the user
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        //    .exec(function(err, posts){

        let users = await User.find({});

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }

}

// module.exports.actionName = function(req,res){}