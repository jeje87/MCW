var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EquipeSchema   = new Schema({
	nom: String,
    description: String,
    club_id: Number,
    categorie_id: Number,
    commentaires: [{ de: String, date: Date, message: String }],
    responsables: [{ membre_id: String, nom: String, prenom: String }],
    dateSuppression: Date
});

module.exports = mongoose.model('Equipe', EquipeSchema);