var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
var moment = require('moment');

describe('Routing', function() {

    var url = 'http://localhost:8080';

    var SuperAdmin = 'Basic U3VwZXJBZG1pbjpzYTE4OTc4MTM7';
    var AdminClub = 'Basic QWRtaW5DbHViOmFjNzY5ODIzIQ';
    var AdminCategorie = 'Basic QWRtaW5DYXRlZ29yaWU6YWNhMjQ4OTY9';
    var AdminEquipe = 'Basic QWRtaW5FcXVpcGU6YWUyNDkzNiI';
    var Utilisateur = 'Basic VXRpbGlzYXRldXI6dXQzMTE5ODUm';

    //SuperAdmin:sa1897813; : U3VwZXJBZG1pbjpzYTE4OTc4MTM7
    //AdminClub:ac769823! : QWRtaW5DbHViOmFjNzY5ODIzIQ==
    //AdminCategorie:aca24896= : QWRtaW5DYXRlZ29yaWU6YWNhMjQ4OTY9
    //AdminEquipe:ae24936" : QWRtaW5FcXVpcGU6YWUyNDkzNiI=
    //Utilisateur:ut311985& : VXRpbGlzYXRldXI6dXQzMTE5ODUm



  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function(done) {
    // In our tests we use the test db
    mongoose.connect(config.db.mongodb);
    done();
  });
  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('Club', function() {

      var now = moment();

      var club = {
          nom: "Club " + now.format('YYYY-MM-DD HH:mm:ss Z')
      };

      it("Ajout : l'appel doit retourner un code 200 et le club ajouté", function(done) {

        // once we have specified the info we want to send to the server via POST verb,
        // we need to actually perform the action on the resource, in this case we want to
        // POST on /api/profiles and we want to send some info
        // We do this using the request object, requiring supertest!
        request(url)
        .post('/api/clubs')
        .set('Authorization', SuperAdmin)
        .send(club)
        // end handles the response
        .end(function(err, res) {
              if (err) {
                throw err;
              }
              // this is should.js syntax, very clear
              res.statusCode.should.equal(200);
              res.body.should.have.property('nom', club.nom);
              res.body.should.have.property('_id').and.should.be.ok;
              club=res.body;
              done();
            });
        });

      it("Modification : l'appel doit retourner un code 200 et le club modifié", function(done) {

          club.nom += "_TestModif";

          // once we have specified the info we want to send to the server via POST verb,
          // we need to actually perform the action on the resource, in this case we want to
          // POST on /api/profiles and we want to send some info
          // We do this using the request object, requiring supertest!
          request(url)
              .put('/api/clubs/'+club._id)
              .set('Authorization', SuperAdmin)
              .send(club)
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(200);
                  res.body.should.have.property('nom', club.nom);
                  club=res.body;
                  done();
              });
      });

      it("Chargement : l'appel doit retourner un code 200 et le club demandé (Admin a accès au club)", function(done) {

          request(url)
              .get('/api/clubs/'+club._id)
              .set('Authorization', SuperAdmin)
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(200);
                  res.body.should.have.property('nom', club.nom);
                  done();
              });
      });

      it("Chargement : l'appel doit retourner un code 401 et rien d'autre (Utilisateur n'a pas accès a ce club)", function(done) {

          request(url)
              .get('/api/clubs/'+club._id)
              .set('Authorization', Utilisateur)
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(401);
                  done();
              });
      });

      it("Chargement avec erreur de mdp : l'appel doit retourner un code 401 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/'+club._id)
              .set('Authorization', 'Basic dG90bzI6MTIzNDU3')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(401);
                  res.body.should.not.have.property('nom');
                  done();
              });
      });

      it("Chargement sans authentification : l'appel doit retourner un code 401 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/'+club._id)
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(401);
                  res.body.should.not.have.property('nom');
                  done();
              });
      });

      it("Chargement de la liste des club pour un super admin: l'appel doit retourner un code 200 avec la liste", function(done) {

          request(url)
              .get('/api/clubs/')
              .set('Authorization', 'Basic U3VwZXJBZG1pbjpzYTE4OTc4MTM7')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(200);
                  res.body.should.be.an.Array.and.an.Object;
                  done();
              });
      });


      it("Chargement de la liste des club pour un admin club : l'appel doit retourner un code 403 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/')
              .set('Authorization', 'Basic QWRtaW5DbHViOmFjNzY5ODIzIQ==')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(403);
                  done();
              });
      });

      it("Chargement de la liste des club pour un admin categorie : l'appel doit retourner un code 403 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/')
              .set('Authorization', 'Basic QWRtaW5DYXRlZ29yaWU6YWNhMjQ4OTY9')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(403);
                  done();
              });
      });

      it("Chargement de la liste des club pour un admin equipe : l'appel doit retourner un code 403 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/')
              .set('Authorization', 'Basic QWRtaW5FcXVpcGU6YWUyNDkzNiI=')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(403);
                  done();
              });
      });

      it("Chargement de la liste des club pour un utilisateur : l'appel doit retourner un code 403 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/')
              .set('Authorization', 'Basic VXRpbGlzYXRldXI6dXQzMTE5ODUm=')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(403);
                  done();
              });
      });


      it("Suppression du club de la liste des club pour un utilisateur : l'appel doit retourner un code 403 et rien d'autre", function(done) {

          request(url)
              .get('/api/clubs/')
              .set('Authorization', 'Basic VXRpbGlzYXRldXI6dXQzMTE5ODUm=')
              .send()
              // end handles the response
              .end(function(err, res) {
                  if (err) {
                      throw err;
                  }
                  // this is should.js syntax, very clear
                  res.statusCode.should.equal(403);
                  done();
              });
      });


  });
});