const bcrypt = require('bcrypt');

var User = db.sequelize.define( 'user' , {
    firstname : {
        type : db.Sequelize.STRING,

    },
    lastname : {
        type : db.Sequelize.STRING,

    },
    email_id:{
        type : db.Sequelize.STRING,
        unique: true,
    },
    password : {
        type : db.Sequelize.STRING
    },
    profilepicture : {
        type : db.Sequelize.STRING,

    },
    phone_no  : {
        type : db.Sequelize.STRING
    },
    status :{
        type : db.Sequelize.BOOLEAN,
        defaultValue : false,
        comment :  "( 0 - Inactive | 1 - Active )"
    }
   
},
{
    hooks : {
        beforeCreate : (user , options) => {
            {
                user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
            }
        }
    },
    underscored: true,
    paranoid: true
});


module.exports = User;
