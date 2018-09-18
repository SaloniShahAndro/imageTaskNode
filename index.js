const express = require('express')
const app = express();
var session = require('express-session');

const bodyParser = require('body-parser');
const openApi = require('./index/routes/open.routes');


app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  cookie: { maxAge: 3600000,expires : false },
  secret: 'dom',
  resave: true,
  saveUninitialized: true
})); // session secret

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With,Authorization, X-HTTP-Method-Override, Content-Type, Accept');

  next();
});

app.get('/', function (req, res) {
  
  if(req.session && req.session.userInfo) {      
      res.redirect('/userlist');return false;
  }
  
  //res.render('login')                
});
app.use(function(req, res, next) {
  res.locals.userInfo = req.session.user; 
  
  next()
})
app.use('/',openApi);

app.use("/apidoc",express.static('apidoc'));
app.use('/assets' , express.static('index/assets/'));
app.set('views','./index/templates');
app.set('view engine', 'ejs');


global.usersession = null
global.db = require('./index/config/sequelize.config');
global.model = require('./index/models');
global.cres = require('./index/helpers/response.helper.js');

global.vh = require('./index/helpers/validator.helper.js');
global.baseurl =' http://localhost:5555/';

app.listen(5000);
