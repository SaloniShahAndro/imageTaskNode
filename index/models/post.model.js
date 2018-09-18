var User = require('./user.model');

var Post = db.sequelize.define( 'post' , {
    title : {
        type : db.Sequelize.STRING,

    },
    description : {
        type : db.Sequelize.STRING,

    },
    user_id : {
        type:db.Sequelize.INTEGER
    }
    
   
},
{
    underscored: true,
    paranoid: true
});

Post.belongsTo(User,{foreignKey:"user_id"})
module.exports = Post;