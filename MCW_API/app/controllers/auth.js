var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Membre = require('../models/membre');
var logger = require('../utils/logger'); 

passport.use(new BasicStrategy(
  function(username, password, callback) {
    Membre.findOne({ login: username }, function (err, membre) {
      if (err) { 
          logger.info('Erreur ' + err );  
          return callback(err); 
      };

      // No user found with that username
      if (!membre) { 
          logger.info('Login inconnu : ' + membre.login );  
          return callback(null, false); 
      };

      // Make sure the password is correct
      membre.verifyMdp(password, function(err, isMatch) {
        if (err) { return callback(err); };

        // Password did not match
        if (!isMatch) { 
            logger.info('Authentification KO pour ' + membre.login );  
            return callback(null, false); 
        };
        // Success
        logger.info('Authentification OK pour ' + membre.login );  
        return callback(null, membre);
      });
    });
  }
));


exports.isAuthenticated = passport.authenticate('basic', { session : false });