// type_membre route

module.exports = function(router) {
    
    var Type_MembreControler = require('../controllers/type_membre');
    var AuthController = require('../controllers/auth');
    
    router.route('/type_membres')
	// création 
	.post(AuthController.isAuthenticated, Type_MembreControler.postItem)
    // sélection de tous les items
    .get(AuthController.isAuthenticated, Type_MembreControler.getItems);

    router.route('/type_membres/:type_membre_id')
    // Sélection d'un item via son id
	.get(AuthController.isAuthenticated, Type_MembreControler.getItemById)
    // Modification d'un item via son id
    .put(AuthController.isAuthenticated, Type_MembreControler.putItem)
    // Suppression d'un item via son id
	.delete(AuthController.isAuthenticated, Type_MembreControler.deleteItem);

}

