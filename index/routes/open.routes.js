var Router = require('express').Router();
var controllers = require('../controllers');


const routes = [
    //Users
    Router.get("/register", controllers.users.getregisterUsers),
    Router.post("/register", controllers.users.registerUser),
    Router.get("/login", controllers.users.getloginUser),
    Router.post("/login", controllers.users.loginUser),
    Router.get("/userlist", controllers.users.getUsersList),
    Router.get("/user/edit/:id", controllers.users.EditUserstatus),
    Router.get("/user/changestatus/:id", controllers.users.changeUserstatus),
    Router.get("/logout", controllers.users.logout),
    Router.get("/post", controllers.posts.getposts),
    Router.post("/post", controllers.posts.posts),
    Router.get("/postlist", controllers.posts.getPostList),
    Router.get("/post/delete/:id",controllers.posts.getPostDelete),
    Router.get("/post/edit/:id",controllers.posts.getPostEdit),
    Router.post("/post/edit/:id",controllers.posts.postEdit)
    
]

module.exports = routes;
