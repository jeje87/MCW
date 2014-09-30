// Club route

module.exports = function(router) {
    
    var Club = require('../models/club');
    var Tools = require('../utils/tools')
    
    router.route('/clubs')

	// création 
	.post(function(req, res) {
		
		var club = new Club(); 
        Tools.map(club,req);

		// save the bear and check for errors
		club.save(function(err) {
			if (err) 
                res.send(err);
            else
                res.json({ message: 'Club ' + club.nom + ' créé !' });
		})
    
    })
    
    // sélection de tous les items
    .get(function(req, res) {
		Club.find(function(err, clubs) {
			if (err)
				res.send(err);
            else
			    res.json(clubs);
		}); 
		
	});

    
    router.route('/clubs/:club_id')

    // Sélection d'un item via son id
	.get(function(req, res) {
		Club.findById(req.params.club_id, function(err, club) {
			if (err)
				res.send(err);
            else
			 res.json(club);
		});
	})
    
    // Modification d'un item via son id
    .put(function(req, res) {

		Club.findById(req.params.club_id, function(err, club) {

			if (err)
				res.send(err);

            var oldName = club.nom;
			Tools.map(club,req);

			// save the club
			club.save(function(err) {
				if (err)
					res.send(err);
                else
				    res.json({ message: 'Club ' + oldName + ' updated!' });
			});

		});
	})
    
    // Suppression d'un item via son id
	.delete(function(req, res) {
		Club.remove({
			_id: req.params.club_id
		}, function(err, club) {
			if (err)
				res.send(err);
            else
                res.json({ message: "Club " + req.params.club_id  + ' successfully deleted' });
		});
	});
}
