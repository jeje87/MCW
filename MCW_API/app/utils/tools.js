var logger = require('./logger'); 

// mapping générique
var map = function(obj,req) {
    for(var parameter in req.body) {
       obj[parameter] = req.body[parameter];
    }                      
}
    
module.exports.map = map;

 // Initialize ALL routes including subfolders
var path = require('path');
var fs = require('fs');
var recursiveRoutes = function(folderName, router) {
    fs.readdirSync(folderName).forEach(function(file) {

        var fullName = path.join(folderName, file);
        var stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(fullName);
        } else if (file.toLowerCase().indexOf('.js')) {
            logger.info("require('./" + fullName + "')");
            require(appRoot + '/' + fullName)(router);
        }
    });
}

module.exports.recursiveRoutes = recursiveRoutes;

// recuperation generique paramètre requete
var reqParam = function(request) {

   this.page=1;
   if (request.param('page') && !isNaN(request.param('page')))
        this.page=parseInt(request.param('page'));

   this.perPage=10;
    if (request.param('perPage')  && !isNaN(request.param('perPage')))
        this.perPage=parseInt(request.param('perPage'));

   this.skip=(this.page-1)*this.perPage;

   this.sortStr="";
   if (request.param('sortStr'))
        this.sortStr=request.param('sortStr');

   this.regSearch=new RegExp(request.param('search'), 'i');

   return this;

}

module.exports.reqParam = reqParam;

var ensureExists = function(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
};

module.exports.ensureExists = ensureExists;
