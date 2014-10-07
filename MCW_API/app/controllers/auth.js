var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Membre = require('../models/membre');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    Membre.findOne({ login: username }, function (err, membre) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!membre) { return callback(null, false); }

      
      // Make sure the password is correct
      membre.verifyMdp(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }
        // Success
        return callback(null, membre);
      });
    });
  }
));


exports.isAuthenticated = passport.authenticate('basic', { session : false });