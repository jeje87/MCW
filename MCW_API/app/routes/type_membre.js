// type_membre route

module.exports = function(router) {
    
    var Type_Membre = require('../models/type_membre');
    var Tools = require('../utils/tools')
    
    router.route('/type_membres')

	// création 
	.post(function(req, res) {
		
		var type_membre = new Type_Membre(); 
        Tools.map(type_membre,req);

		// save the bear and check for errors
		type_membre.save(function(err) {
			if (err) 
                res.send(err);
            else
                res.json({ message: 'OK' });
		})
    
    })
    
    // sélection de tous les items
    .get(function(req, res) {
		Type_Membre.find(function(err, type_membres) {
			if (err)
				res.send(err);
            else
			    res.json(type_membres);
		}); 
		
	});

    
    router.route('/type_membres/:type_membre_id')

    // Sélection d'un item via son id
	.get(function(req, res) {
		Type_Membre.findById(req.params.type_membre_id, function(err, type_membre) {
			if (err)
				res.send(err);
            else
			 res.json(type_membre);
		});
	})
    
    // Modification d'un item via son id
    .put(function(req, res) {

		Type_Membre.findById(req.params.type_membre_id, function(err, type_membre) {

			if (err)
				res.send(err);

			Tools.map(type_membre,req);

			// save the type_membre
			type_membre.save(function(err) {
				if (err)
					res.send(err);
                else
				    res.json({ message: 'OK' });
			});

		});
	})
    
    // Suppression d'un item via son id
	.delete(function(req, res) {
		Type_Membre.remove({
			_id: req.params.type_membre_id
		}, function(err, type_membre) {
			if (err)
				res.send(err);
            else
                res.json({ message: 'OK' });
		});
	});
}
