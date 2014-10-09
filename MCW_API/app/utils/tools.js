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