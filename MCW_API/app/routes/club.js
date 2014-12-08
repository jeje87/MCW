// Club route
module.exports = function(router) {
    
    var ClubControler = require('../controllers/club');
    var AuthController = require('../controllers/auth');
    
    router.route('/clubs')
	// création 
	.post(AuthController.isAuthenticated, ClubControler.postItem)
    // sélection de tous les items
    .get(AuthController.isAuthenticated, ClubControler.getItems);
    //.get( ClubControler.getItems);

    router.route('/clubs/:club_id')
    // Sélection d'un item via son id
	.get(AuthController.isAuthenticated, ClubControler.getItemById)
    //.get(ClubControler.getItemById)
    // Modification d'un item via son id
    .put(AuthController.isAuthenticated, ClubControler.putItem)
    // Suppression d'un item via son id
	.delete(AuthController.isAuthenticated, ClubControler.deleteItem);

    router.route('/clubs/images/:club_id')
        // Sélection d'un item via son id
        .get(AuthController.isAuthenticated, ClubControler.getItemImagesById)


}
