    
var Categorie = require('../models/categorie');
var Tools = require('../utils/tools')

// création 
exports.postItem = function(req, res) {

    var categorie = new Categorie(); 
    Tools.map(categorie,req);

    categorie.save(function(err) {
        if (err) 
            res.send(err);
        else
            res.json({ message: 'OK' });
    })

};

// sélection de tous les items
exports.getItems = function(req, res) {
    Categorie.find(function(err, categories) {
        if (err)
            res.send(err);
        else
            res.json(categories);
    }); 

};

// Sélection d'un item via son id
exports.getItemById = function(req, res) {
    Categorie.findById(req.params.categorie_id, function(err, categorie) {
        if (err)
            res.send(err);
        else
            res.json(categorie);
    });
};

// Modification d'un item via son id
exports.putItem = function(req, res) {

    Categorie.findById(req.params.categorie_id, function(err, categorie) {

        if (err)
            res.send(err);

        Tools.map(categorie,req);

        // save 
        categorie.save(function(err) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'OK' });
        });

    });
};

// Suppression d'un item via son id
exports.deleteItem = function(req, res) {
    Categorie.remove({
        _id: req.params.categorie_id
    }, function(err, categorie) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'OK' });
    });
};

