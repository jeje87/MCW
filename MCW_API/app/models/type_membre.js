var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Type_MembreSchema   = new Schema({
	libelle: String,
    description: String,
    club_id: Number
});

module.exports = mongoose.model('Type_Membre', Type_MembreSchema);