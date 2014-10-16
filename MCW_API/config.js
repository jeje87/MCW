var config = {}

config.db = {};
config.db.mongodb = 'mongodb://localhost:27017/MyClub';
config.db.mongodbtest = 'mongodb://localhost:27017/MyClubTest';

config.web = {};
config.web.port = process.env.PORT || 8080;

module.exports = config;