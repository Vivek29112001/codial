const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
            if (post) {
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });

                post.comments.push(comment);
                post.save();

                if (req.xhr){
                    return res.status(200).json({
                        data:{
                            comment : comment
                        },
                        message:"comment created!"
                    })
                }
        
                req.flash('success','comment Published');
                return res.redirect('back');
            }
    } catch(err) {
        console.log('Error', err);
        return;
    }


}


module.exports.destroy = async function (req, res) {
    
    try{
        let comment = await Comment.findById(req.params.id);
        
        if(comment){
            if (comment.user == req.user.id) {
    
                let commentId = comment.user;
                comment.remove();
    
                // await Comment.deleteMany({ comment: req.params.id } );
                await Post.findByIdAndUpdate(commentId, { comments: request.params.id });
                  req.flash("successs", "Comment Deleted Successfully");
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment_id: req.params.id
                        },
                        message:"comment deleted Scuccessfully"
                        
                    })
                }
    
                req.flash('success','comment deleted Published');
                return res.redirect('back');

            } 
        }
        else {
                req.flash('success','You canot delete this Comment!');
                return res.redirect('back');
            }
        
    }catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
    
};