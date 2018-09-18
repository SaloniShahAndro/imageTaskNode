define({ "api": [
  {
    "type": "post",
    "url": "/post",
    "title": "Create Post",
    "name": "Create_Post",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Post's title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Post's Description</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "user_id",
            "description": "<p>user's id from which user is posting the posts</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "index/controllers/post.controller.js",
    "groupTitle": "Posts"
  },
  {
    "type": "get",
    "url": "/post/delete/:id",
    "title": "Delete Post",
    "name": "Delete_Post",
    "group": "Posts",
    "version": "0.0.0",
    "filename": "index/controllers/post.controller.js",
    "groupTitle": "Posts"
  },
  {
    "type": "post",
    "url": "/post/edit/:id",
    "title": "Edit Post",
    "name": "Edit_Post",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Post's title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Post's Description</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "index/controllers/post.controller.js",
    "groupTitle": "Posts"
  },
  {
    "type": "get",
    "url": "/postlist",
    "title": "Post's List",
    "name": "Post_List",
    "group": "Posts",
    "version": "0.0.0",
    "filename": "index/controllers/post.controller.js",
    "groupTitle": "Posts"
  },
  {
    "type": "get",
    "url": "/user/edit/:id",
    "title": "Edit User status to Inactive",
    "name": "EditUserStatus",
    "group": "User",
    "version": "0.0.0",
    "filename": "index/controllers/users.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/userlist",
    "title": "List",
    "name": "List",
    "group": "User",
    "version": "0.0.0",
    "filename": "index/controllers/users.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email_id",
            "description": "<p>User's Email Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password(min 5 digit)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "index/controllers/users.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "User",
    "version": "0.0.0",
    "filename": "index/controllers/users.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Registration",
    "name": "Registration",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstname",
            "description": "<p>User's First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>User's Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email_id",
            "description": "<p>User's Email Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password(min 5 digit)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone_no",
            "description": "<p>User's Phone</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "profilepicture",
            "description": "<p>User's Profile Picture</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "index/controllers/users.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/changestatus/:id",
    "title": "Edit User status to Active",
    "name": "changeUserstatus",
    "group": "User",
    "version": "0.0.0",
    "filename": "index/controllers/users.controller.js",
    "groupTitle": "User"
  }
] });
