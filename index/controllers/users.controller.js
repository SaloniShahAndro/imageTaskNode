const upload = require('../helpers/image-upload.helper').userImageUpload;
const fs = require('fs');
const Jimp = require("jimp");
const imageinfo = require('imageinfo');
const bcrypt = require('bcrypt')




exports.getregisterUsers = (req, res) => {
    res.render('register');

}
/**
 * @api {post} /register Registration
 * @apiName Registration
 * @apiGroup User
 * @apiparam {string} firstname   User's First Name
 * @apiparam {string} lastname   User's Last Name
 * @apiparam {string} email_id   User's Email Id
 * @apiparam {string} password   User's Password(min 5 digit)
 * @apiparam {string} phone_no   User's Phone
 * @apiparam          profilepicture   User's Profile Picture
 */
exports.registerUser = (req, res) => {
    if (req.method == "POST") {
        upload(req, res).then(() => {
          
            var params = req.body

            moveToOriginal(req.body.profilepicture);

            model.User.findOne({ where: { 'email_id': params.email_id } }).then(data => {
                if (data) {
                    cres.send(res, "Email Id already exists!")
                } else {
                    model.User.create(params).then((userdata) => {
                        console.log(userdata);
                        cres.send(res, "data added successfully")
                    }).catch(err => {
                        console.log(err);
                    });
                }
            })

        })
    }
}

exports.getloginUser = (req, res) => {
    console.log(">>>usersession login ", usersession)
    if(usersession == null){
        res.render('login');
    }else{
        res.redirect('back')
    }
   

}
/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup User
 * @apiparam {string} email_id   User's Email Id
 * @apiparam {string} password   User's Password(min 5 digit)
 */
exports.loginUser = (req, res) => {
    var params = req.body;
   // console.log(">>params", params)
  
    model.User.find({raw:true, where: { 'email_id': params.email_id } }).then(userData => {
        if (userData) {

           // console.log(">>>>>userdata",userData)
            bcrypt.compare(params.password, userData.password).then(function (response) {
               
                if (response == true ) {
                    if(userData.status == true){
                        cres.send(res, "login successfully")
                        req.session.user = userData;
                        console.log(">>>>>>user_id", req.session.user.id)
                        usersession = req.session.user.id
                        
                    }else{
                     return cres.error(res,'Your account is Inactive');   
                        
                    }
                    
                } else {
                   return cres.error(res, 'invalid username or password for login')
                
                 
                }
            });

        } else {
            return cres.error(res,'Email Id is invalid')
        }
    })

    

}
/**
 * @api {get} /userlist List
 * @apiName List
 * @apiGroup User
 */
exports.getUsersList = (req, res) => {
  model.User.findAll({raw:true}).then(getUserListData=>{
       //console.log(">>getUserListData",getUserListData)
      if(getUserListData){
        res.render('dashboard',{userData: getUserListData})
       
      }else{
        cres.send(res,getUserListData,"Sorry , No User is availbale for now");
      }
     
  })
}
/**
 * @api {get} /user/edit/:id Edit User status to Inactive
 * @apiName EditUserStatus
 * @apiGroup User
 */
exports.EditUserstatus = (req,res) =>{
    model.User.findOne({raw:true,where:{id:req.params.id}}).then(editUserStatusData =>{
        
        if(editUserStatusData){
            console.log(">>>>>edituserdata",editUserStatusData)
            if(editUserStatusData.status == 1){
                model.User.update({
                    status : false

                },{
                    where:{
                        id:req.params.id
                    }
                })
            }
          
            res.redirect('back');
        }else{

        }
    })
}

/**
 * @api {get} /user/changestatus/:id Edit User status to Active
 * @apiName changeUserstatus
 * @apiGroup User
 */
exports.changeUserstatus = (req,res) =>{
    model.User.findOne({raw:true,where:{id:req.params.id}}).then(editUserStatusData =>{
        
        if(editUserStatusData){
           if(editUserStatusData.status == 0){
                model.User.update({
                    status : true
                },{
                    where:{
                        id:req.params.id
                    }
                })
            
            }
            res.redirect('back');
        }else{

        }
    })
}


/**
 * @api {get} /logout Logout
 * @apiName Logout
 * @apiGroup User
 */
exports.logout = (req,res) =>{
    usersession = null;
    
    res.redirect('/login')
}

function moveToOriginal(filename) {
    if (filename != '') {
        fs.rename(`index/assets/tmp/${filename}`, `index/assets/uploads/profilepictures/${filename}`, function () {
            resize_image(filename);
        });
        fs.readFile(`index/assets/uploads/profilepictures/${filename}`, function (err, data) {
            if (err) throw err;

            info = imageinfo(data);
            console.log("Data is type:", info.mimeType);
            console.log("  Size:", data.length, "bytes");
            console.log("  Dimensions:", info.width, "x", info.height);
        })

    }

}

function resize_image(filename) {
    Jimp.read(`index/assets/uploads/profilepictures/${filename}`, function (err, img) {
        if (err) console.log('ERROR==========>', err);
        img.resize(Jimp.AUTO, 100).quality(100).write(`index/assets/uploads/profilepictures/thumb/${filename}`); // save ;
    });
}
