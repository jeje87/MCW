var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategorieSchema   = new Schema({
	nom: String,
    description: String,
    anneeInf: Number,
    anneeSup: Number,
    club_id: Number,
    commentaires: [{ de: String, date: Date, message: String }],
    responsables: [{ membre_id: String, nom: String, prenom: String, }]
});

module.exports = mongoose.model('Categorie', CategorieSchema);