var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MembreSchema   = new Schema({
	nom: String,
    prenom: String,
    DateNaissance: Date,
    adresse1: String,
    adresse2: String,
    codePostal: String,
    ville: String,
    description: String,
    telephone1: String,
    telephone2: String,
    email1: String,
    email2: String,
    commentaires: String,
    club_id: Number,
    categorie_id: Number,
    club_id: Number,
    photo_url: String
});

module.exports = mongoose.model('Membre', MembreSchema);