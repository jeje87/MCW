var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClubSchema   = new Schema({
	nom: String,
    adresse1: String,
    adresse2: String,
    codePostal: String,
    ville: String,
    description: String,
    telephone: String,
    email: String,
    facebookUrl: String,
    GoogleUrl: String,
    externalUrl: String
});

module.exports = mongoose.model('Club', ClubSchema);