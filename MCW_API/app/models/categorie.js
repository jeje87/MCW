var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategorieSchema   = new Schema({
	nom: String,
    description: String,
    anneeInf: Number,
    anneeSup: Number,
    club_id: Number
});

module.exports = mongoose.model('Categorie', CategorieSchema);