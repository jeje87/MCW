// equipe controller

var Equipe = require('../models/equipe');
var Tools = require('../utils/tools')

// création 
exports.postItem=  function(req, res) {

    var equipe = new Equipe(); 
    Tools.map(equipe,req);

    equipe.save(function(err) {
        if (err) 
            res.send(err);
        else
            res.json({ message: 'OK' });
    });

};

// sélection de tous les items
exports.getItems = function(req, res) {
    Equipe.find(function(err, equipes) {
        if (err)
            res.send(err);
        else
            res.json(equipes);
    }); 

};

// Sélection d'un item via son id
exports.getItemById = function(req, res) {
    Equipe.findById(req.params.equipe_id, function(err, equipe) {
        if (err)
            res.send(err);
        else
            res.json(equipe);
    });
};

// Modification d'un item via son id
exports.putItem = function(req, res) {

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
};

// Suppression d'un item via son id
exports.deleteItem = function(req, res) {
    Equipe.remove({
        _id: req.params.equipe_id
    }, function(err, equipe) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'OK' });
    });
};

