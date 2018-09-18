var Sequelize = require('sequelize');
require('dotenv').config();

const DB_DETAILS = {
						"development" : {
							"db_host" : "localhost",
							"db_name" : "usermanagement",
							"db_username" : "root",
							"db_passoword" : "root",
							"db_dialect" : "mysql"						
						},
						"production" : {
							"db_host" : "localhost",
							"db_name" : "usermanagement",
							"db_username" : "root",
							"db_passoword" : "root"	,
							"db_dialect" : "mysql"						
						}
					}

const env_db = DB_DETAILS[process.env.NODE_ENV];

const sequelize = new Sequelize(env_db.db_name, env_db.db_username, env_db.db_passoword, {
	  host: env_db.db_host,
	  dialect: env_db.db_dialect,
	  pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	  }
	});
sequelize
	.authenticate()
	.then(() => {
	    console.log('Connection has been established successfully.');
	})
	.catch(err => {
	    console.error('Unable to connect to the database:', err);
	});
module.exports = { Sequelize , sequelize };