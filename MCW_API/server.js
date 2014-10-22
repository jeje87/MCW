// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var config = require('./config');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./app/controllers/auth');
var mongoose   = require('mongoose');
var path = require('path');
var Tools = require('./app/utils/tools'); //fonction utilitaires
var logger = require('./app/utils/logger'); //logger winston

logger.info('Initialisation du serveur');

app.use(passport.initialize());
//app.use(passport.session()); 
app.use(express.static(__dirname + '/public'));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = config.web.port; 		// set our port
mongoose.connect(config.db.mongodb);
global.appRoot = path.resolve(__dirname); //root directory


// =============================================================================
// =============================================================================
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// ROUTES FOR OUR API
// =============================================================================

//enable cors
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Bienvenue sur notre API!' });	
});

// more routes for our API will happen here
Tools.recursiveRoutes('app/routes', router); // Initialize it
app.use('/api', router);

// =============================================================================
// =============================================================================



// =============================================================================
// =============================================================================
// Authentification
// =============================================================================

/*
var Membre = require('./app/models/membre');

passport.use(new LocalStrategy(
  function(username, password, done) {
    Membre.findOne({login: username}, function(err, membre) {
      if (err) { return done(err); }
      if (!membre) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (membre.mdp != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, membre);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', function(req,res) {
  res.sendfile('index.htm');
});
app.get('/login', function(req,res) {
  res.sendfile('index.htm');
});
app.post('/login',
    passport.authenticate('local', { successRedirect: '/?authentication=OK',
                                   failureRedirect: '/?authentication=error',
                                   failureFlash: false })
);
*/

// =============================================================================
// =============================================================================


// START THE SERVER
// =============================================================================
app.listen(port);
logger.info('Serveur démarré sur le port ' + port);
// enjoy
// =============================================================================
// =============================================================================