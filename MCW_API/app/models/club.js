var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClubSchema   = new Schema({
	nom: String,
    adresse: [String],
    codePostal: String,
    ville: String,
    description: String,
    telephones: [{ libelle: String, telephone: String }],
    emails: [{ libelle: String, email: String }],
    urls: [{ libelle: String, date: Date, url: String }],
    commentaires: [{ de: String, date: Date, message: String }],
    images: [{ path: String, date: Date }],
    dateSuppression: Date
});

module.exports = mongoose.model('Club', ClubSchema);