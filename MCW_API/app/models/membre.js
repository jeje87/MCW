var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MembreSchema   = new Schema({
	nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: Date,
    adresse: [String],
    codePostal: String,
    ville: String,
    description: String,
    telephones: [{ libelle: String, telephone: String }],
    emails: [{ libelle: String, email: String }],
    commentaires: [{ de: String, date: Date, message: String }],
    club_id: Number,
    categorie_id: Number,
    photo_url: String,
    type_membre: {type_membre_id:Number, libelle: String},
    login: { type: String, index: { unique: true } },
    mdp: String
});

module.exports = mongoose.model('Membre', MembreSchema);