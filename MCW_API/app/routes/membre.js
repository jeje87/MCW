// membre route

module.exports = function(router) {
    
    var Membre   = require('../models/membre');
    var Tools    = require('../utils/tools');
    var bcrypt   = require('bcrypt-nodejs');
    
    router.route('/membres')

	// création 
	.post(function(req, res) {
		
		var membre = new Membre(); 
        Tools.map(membre,req);
        var salt = bcrypt.genSaltSync(10);
        membre.mdp = bcrypt.hashSync(membre.mdp,salt,null);

		membre.save(function(err) {
			if (err) 
                res.send(err);
            else
                res.json({ message: 'OK' });
		})
    
    })
    
    // sélection de tous les items
    .get(function(req, res) {
		Membre.find(function(err, membres) {
			if (err)
				res.send(err);
            else
			    res.json(membres);
		}); 
		
	});

    
    router.route('/membres/:membre_id')

    // Sélection d'un item via son id
	.get(function(req, res) {
		Membre.findById(req.params.membre_id, function(err, membre) {
			if (err)
				res.send(err);
            else
                res.json(membre);
		});
	})
    
    // Modification d'un item via son id
    .put(function(req, res) {

		Membre.findById(req.params.membre_id, function(err, membre) {

			if (err)
				res.send(err);

			Tools.map(membre,req);

			// save 
			membre.save(function(err) {
				if (err)
					res.send(err);
                else
				    res.json({ message: 'OK' });
			});

		});
	})
    
    // Suppression d'un item via son id
	.delete(function(req, res) {
		Membre.remove({
			_id: req.params.membre_id
		}, function(err, membre) {
			if (err)
				res.send(err);
            else
                res.json({ message: 'OK' });
		});
	});
}
