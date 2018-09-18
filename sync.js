global.db = require('./index/config/sequelize.config');
global.model = require('./index/models');
/**
 * This will create the tables in DB if not exists any
 */
require('./index/models/sync/sync.model').syncModels();