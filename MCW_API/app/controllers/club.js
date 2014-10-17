// Club controller
var logger = require('../utils/logger');
var Club = require('../models/club');
var Tools = require('../utils/tools');

// création 
exports.postItem = function(req, res) {

    //test des droits
    //seulement pour le SA
    if (typeof req.user.droit != 'number' || req.user.droit > 0) {
        logger.info('Droits insufisants : ' + req.user.login );
        res.send(403);
        return;
    }

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

    //test des droits
    if (typeof req.user.droit != 'number' || req.user.droit > 0) {
        logger.info('Droits insufisants : ' + req.user.login );
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

    //test des droits
    /*if (typeof req.user.droit != 'number' || req.user.droit > 0) {
        logger.info('Droits insufisants : ' + req.user.login );
        res.send(403);
        return;
    }*/

    Club.findById(req.params.club_id, function(err, club) {
        if (err) {
            res.send(err);
        }
        else {

            if ((typeof req.user.droit != 'number' || req.user.droit > 0) && (typeof req.user.club_id != 'number' || req.user.club_id != club._id)) {
                logger.info('Droits insufisants : ' + req.user.login);
                res.send(401);
                return;
            }
            res.json(club);
        }
    });

};

// Modification d'un item via son id
exports.putItem = function(req, res) {

    //test des droits. Suelement le SA et l'admin du club
    if (typeof req.user.droit != 'number' || req.user.droit > 10) {
         logger.info('Droits insufisants : ' + req.user.login );
         res.send(403);
         return;
     }

    Club.findById(req.params.club_id, function(err, club) {

        if (err)
            res.send(err);

        if ((typeof req.user.droit != 'number' || req.user.droit > 10) && (typeof req.user.club_id != 'number' || req.user.club_id != club._id)) {
            logger.info('Droits insufisants : ' + req.user.login);
            res.send(401);
            return;
        }

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

