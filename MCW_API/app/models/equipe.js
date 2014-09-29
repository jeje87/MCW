var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EquipeSchema   = new Schema({
	nom: String,
    description: String,
    anneeInf: Number,
    anneeSup: Number,
    club_id: Number,
    categorie_id: Number
});

module.exports = mongoose.model('Equipe', EquipeSchema);