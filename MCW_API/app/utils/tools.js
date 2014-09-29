module.exports = function(app) {
    
    // mapping générique
    var map = function(obj,req) {
        for(var parameter in req.body) {
           obj[parameter] = req.body[parameter];
        }                      
    }
    
       
}