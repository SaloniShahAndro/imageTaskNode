// options.logging : A function that logs sql queries, or false for no logging
// options.force :  If force is true, each Model will run DROP TABLE IF EXISTS, before it tries to create its own table
// options.alter : Alters tables to fit models. Not recommended for production use. Deletes data in columns that were removed or had their type changed in the model.    
var options = { logging: true, force: true, alter: false };
const co = require('co');


exports.syncModels = co.wrap(function* (val) {
    try {

        yield model.User.sync(options);
        yield model.User.findAll().then(data => {
            if (data.length == 0) {
                model.User.create({
                    firstname: "sadmin",
                    lastname: "sadmin",
                    email_id: "admin@admin.com",
                    password: "123456",
                    status: "1"
                });
            }
        });
        yield model.Post.sync(options);
        yield model.Post.findAll().then(data => {
            if (data.length == 0) {
                model.Post.create({
                   title:"post1",
                   description:"this is post 1",
                   user_id : 1
                });
            }
        });

        // ----------------- NOT USED ANYWHERE IN THE PROJECT -----------------
        // yield model.Section.sync(options);
        // yield model.Permission.sync(options);
    }
    catch (err) {
        console.log(err);
    }

});