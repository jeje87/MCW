// Club route

module.exports = function(router) {
    
    var ClubControler = require('../controllers/club');
    var authController = require('../controllers/auth');
    
    router.route('/clubs')
	// création 
	.post(authController.isAuthenticated, ClubControler.postItem)
    // sélection de tous les items
    .get(authController.isAuthenticated, ClubControler.getItem);

    
    router.route('/clubs/:club_id')
    // Sélection d'un item via son id
	.get(authController.isAuthenticated, ClubControler.getItemById)
    // Modification d'un item via son id
    .put(authController.isAuthenticated, ClubControler.putItem)
    // Suppression d'un item via son id
	.delete(authController.isAuthenticated, ClubControler.deleteItem);
}
