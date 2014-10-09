// categorie route

module.exports = function(router) {
    
    var CategorieControler = require('../controllers/categorie');
    var AuthController = require('../controllers/auth');
    
    router.route('/categories')
    
	// création 
	.post(AuthController.isAuthenticated, CategorieControler.postItem)
    // sélection de tous les items
    .get(AuthController.isAuthenticated, CategorieControler.getItems);

    router.route('/categories/:categorie_id')
    // Sélection d'un item via son id
	.get(AuthController.isAuthenticated, CategorieControler.getItemById)
    // Modification d'un item via son id
    .put(AuthController.isAuthenticated, CategorieControler.putItem)
    // Suppression d'un item via son id
	.delete(AuthController.isAuthenticated, CategorieControler.deleteItem);

}
