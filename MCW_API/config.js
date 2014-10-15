var config = {}

config.db = {};
config.db.mongodb = 'mongodb://localhost:27017/MyClub';

config.web = {};
config.web.port = process.env.PORT || 8080;

module.exports = config;