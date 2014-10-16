// Club controller
    
var Club = require('../models/club');
var Tools = require('../utils/tools')

// création 
exports.postItem = function(req, res) {

    var club = new Club(); 
    Tools.map(club,req);

    club.save(function(err) {
        if (err) 
            res.send(err);
        else
            res.json(club);
    })

};

// sélection de tous les items
exports.getItems = function(req, res) {
    console.log(req.user.droit);
    if (typeof req.user.droit != 'number' || req.user.droit > 0) {
        res.send(403);
        return;
    }

    Club.find(function(err, clubs) {
        if (err)
            res.send(err);
        else
            res.json(clubs);
    }); 

};

// Sélection d'un item via son id
exports.getItemById = function(req, res) {
    Club.findById(req.params.club_id, function(err, club) {
        if (err)
            res.send(err);
        else
         res.json(club);
    });
};

// Modification d'un item via son id
exports.putItem = function(req, res) {

    Club.findById(req.params.club_id, function(err, club) {

        if (err)
            res.send(err);

        Tools.map(club,req);

        // save the club
        club.save(function(err) {
            if (err)
                res.send(err);
            else
                res.json(club);
        });

    });
};

// Suppression d'un item via son id
exports.deleteItem = function(req, res) {
    Club.remove({
        _id: req.params.club_id
    }, function(err, club) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'OK' });
    });
};

