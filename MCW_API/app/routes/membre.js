// membre route

module.exports = function(router) {
    
    var MembreControler = require('../controllers/membre');
    var AuthController = require('../controllers/auth');
    
    router.route('/membres')
	// création 
	.post(AuthController.isAuthenticated, MembreControler.postItem)
    // sélection de tous les items
    .get(AuthController.isAuthenticated, MembreControler.getItems);

    router.route('/membres/:membre_id')
    // Sélection d'un item via son id
	.get(AuthController.isAuthenticated, MembreControler.getItemById)
    // Modification d'un item via son id
    .put(AuthController.isAuthenticated, MembreControler.putItem)
    // Suppression d'un item via son id
	.delete(AuthController.isAuthenticated, MembreControler.deleteItem);

};

