{

    // method to submit the form data for new post using AJax
    let createPost = function (){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

        // method to create a post in DOM
    let newPostDom = function(post){
        return $(`
        <li id="post-${post._id }">
            <p>
               
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post.id }> Delete</a>
                    </small>

                            ${post.content}
                            <small>
                                ${post.user.name }
                            </small>
                            <br>
                            <small>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                        </small>
            </p>
            <div class="post-comments">
                
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type here to Add Comment...." required>
                        <input type="hidden" name="post" value="${post.id}>
                        <input type="submit" value="Add comment">
                    </form>
        
        
                        <div class="post-comments-list">
                            <ul id="post-comments-${Ppost._id }">
                                
                            </ul>
                        </div>
            </div>
    
    </li>
        `)
    }    

    // method to delete post fromDOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }




    createPost();
}