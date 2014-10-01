// equipe route

module.exports = function(router) {
    
    var Equipe = require('../models/equipe');
    var Tools = require('../utils/tools')
    
    router.route('/equipes')

	// création 
	.post(function(req, res) {
		
		var equipe = new Equipe(); 
        Tools.map(equipe,req);

		// save the bear and check for errors
		equipe.save(function(err) {
			if (err) 
                res.send(err);
            else
                res.json({ message: 'OK' });
		})
    
    })
    
    // sélection de tous les items
    .get(function(req, res) {
		Equipe.find(function(err, equipes) {
			if (err)
				res.send(err);
            else
			    res.json(equipes);
		}); 
		
	});

    
    router.route('/equipes/:equipe_id')

    // Sélection d'un item via son id
	.get(function(req, res) {
		Equipe.findById(req.params.equipe_id, function(err, equipe) {
			if (err)
				res.send(err);
            else
                res.json(equipe);
		});
	})
    
    // Modification d'un item via son id
    .put(function(req, res) {

		Equipe.findById(req.params.equipe_id, function(err, equipe) {

			if (err)
				res.send(err);

			Tools.map(equipe,req);

			// save 
			equipe.save(function(err) {
				if (err)
					res.send(err);
                else
				    res.json({ message: 'OK' });
			});

		});
	})
    
    // Suppression d'un item via son id
	.delete(function(req, res) {
		Equipe.remove({
			_id: req.params.equipe_id
		}, function(err, equipe) {
			if (err)
				res.send(err);
            else
                res.json({ message: 'OK' });
		});
	});
}
