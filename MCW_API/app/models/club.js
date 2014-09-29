var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClubSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Club', ClubSchema);