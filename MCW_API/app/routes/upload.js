// categorie route

module.exports = function(router) {
    
    var UploadControler = require('../controllers/upload');
    var AuthController = require('../controllers/auth');
    
    router.route('/upload')
    
	// upload
	.post(AuthController.isAuthenticated, UploadControler.upload);


};
