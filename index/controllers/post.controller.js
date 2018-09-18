
 exports.getposts = (req,res) =>{
    res.render('post')
}



/**
 * @api {post} /post Create Post
 * @apiName Create Post
 * @apiGroup Posts
 * @apiparam {string} title         Post's title
 * @apiparam {string} description   Post's Description
 * @apiparam {int} user_id          user's id from which user is posting the posts
 */
exports.posts = (req,res) =>{
   
    // console.log(">>>>>usersession",usersession)
     var params = {title:req.body.title,description:req.body.description,user_id:usersession}
     model.Post.create(params).then(postdata=>{    
         res.render('postlist',{postData:postdata})
     })
    
 }
 
/**
 * @api {get} /postlist Post's List
 * @apiName Post List
 * @apiGroup Posts
 */
 
 exports.getPostList = (req,res) =>{
     model.Post.findAll({where:{user_id:usersession}}).then(allpostdata=>{
        // console.log(">>>>>all posts ",allpostdata)
         res.render('postlist',{postData:allpostdata})
     })
 }

 /**
 * @api {get} /post/delete/:id Delete Post
 * @apiName Delete Post
 * @apiGroup Posts
 */
 
 exports.getPostDelete = (req,res) =>{
     model.Post.destroy({where:{id:req.params.id}}).then(deletepostdata=>{    
         res.redirect('back');
     })
 }
 
 exports.getPostEdit = (req,res) =>{
     model.Post.find({where:{id:req.params.id}}).then(getPostEditData=>{
       
         res.render('postedit',{postData:getPostEditData})
     })
     
 }

 /**
 * @api {post} /post/edit/:id  Edit Post
 * @apiName Edit Post
 * @apiGroup Posts
 * @apiparam {string} title         Post's title
 * @apiparam {string} description   Post's Description
 */
 exports.postEdit = (req,res) =>{
     var params = {title:req.body.title,description:req.body.description}
     
     model.Post.update(params,{where:{id:req.params.id}}).then(editpostdata=>{  
         
         res.render('postlist',{postData:editpostdata});
     })
 }