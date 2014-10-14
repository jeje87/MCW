// equipe route

module.exports = function(router) {
    
    var EquipeControler = require('../controllers/equipe');
    var AuthController = require('../controllers/auth');
    
    router.route('/equipes')
	// création 
	.post(AuthController.isAuthenticated, EquipeControler.postItem)
    // sélection de tous les items
    .get(AuthController.isAuthenticated, EquipeControler.getItems);

    router.route('/equipes/:equipe_id')
    // Sélection d'un item via son id
	.get(AuthController.isAuthenticated, EquipeControler.getItemById)
    // Modification d'un item via son id
    .put(AuthController.isAuthenticated, EquipeControler.putItem)
    // Suppression d'un item via son id
	.delete(AuthController.isAuthenticated, EquipeControler.deleteItem);

}
