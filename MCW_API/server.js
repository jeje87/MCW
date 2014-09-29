// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MyClub'); 

var Club     = require('./app/models/club');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

// Club route

router.route('/clubs')

	// create a clubs (accessed at POST http://localhost:8080/api/clubs)
	.post(function(req, res) {
		
		var club = new Club(); 		// create a new instance of the Club model
		club.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		club.save(function(err) {
			if (err) 
                res.send(err);
            else
                res.json({ message: 'Club ' + club.name + 'created!' });
		})
    
    })
    .get(function(req, res) {
		Club.find(function(err, clubs) {
			if (err)
				res.send(err);
            else
			    res.json(clubs);
		}); 
		
	});

router.route('/clubs/:club_id')

	.get(function(req, res) {
		Club.findById(req.params.club_id, function(err, club) {
			if (err)
				res.send(err);
            else
			 res.json(club);
		});
	})
    .put(function(req, res) {

		Club.findById(req.params.club_id, function(err, club) {

			if (err)
				res.send(err);

            var oldName = club.name;
			club.name = req.body.name; 	// update the club info

			// save the club
			club.save(function(err) {
				if (err)
					res.send(err);
                else
				    res.json({ message: 'Club ' + oldName + ' updated!' });
			});

		});
	})
	.delete(function(req, res) {
		Club.remove({
			_id: req.params.club_id
		}, function(err, club) {
			if (err)
				res.send(err);
            else
                res.json({ message: "Club " + req.params.club_id  + ' successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);