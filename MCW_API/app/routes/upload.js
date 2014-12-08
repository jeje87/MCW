// categorie route

module.exports = function(router) {
    
    var UploadControler = require('../controllers/upload');
    var AuthController = require('../controllers/auth');
    
    router.route('/upload/:club_id')
    
	// upload
	    .post(AuthController.isAuthenticated, UploadControler.upload);

    router.route('/upload/clubs/:club_id/:image_id')

        // upload
        .get(UploadControler.getImage);

};
