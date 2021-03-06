var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcrypt-nodejs');

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
    club_id: { type: Number, required: true },
    categorie_id: Number,
    photo_url: String,
    type_membre: {type_membre_id:Number, libelle: String},
    login: { type: String, index: { unique: true } },
    mdp: String,
    droit: { type: Number, required: true } /*0 SA - 10 Admin club - 20 Admin Catégorie - 30 Admin Equipe - 40 user */
});

MembreSchema.methods.verifyMdp = function(mdp, cb) {
  bcrypt.compare(mdp, this.mdp, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Membre', MembreSchema);