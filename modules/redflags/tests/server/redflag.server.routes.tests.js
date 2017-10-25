'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Redflag = mongoose.model('Redflag'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  redflag;

/**
 * Redflag routes tests
 */
describe('Redflag CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Redflag
    user.save(function () {
      redflag = {
        name: 'Redflag name'
      };

      done();
    });
  });

  it('should be able to save a Redflag if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Redflag
        agent.post('/api/redflags')
          .send(redflag)
          .expect(200)
          .end(function (redflagSaveErr, redflagSaveRes) {
            // Handle Redflag save error
            if (redflagSaveErr) {
              return done(redflagSaveErr);
            }

            // Get a list of Redflags
            agent.get('/api/redflags')
              .end(function (redflagsGetErr, redflagsGetRes) {
                // Handle Redflags save error
                if (redflagsGetErr) {
                  return done(redflagsGetErr);
                }

                // Get Redflags list
                var redflags = redflagsGetRes.body;

                // Set assertions
                (redflags[0].user._id).should.equal(userId);
                (redflags[0].name).should.match('Redflag name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Redflag if not logged in', function (done) {
    agent.post('/api/redflags')
      .send(redflag)
      .expect(403)
      .end(function (redflagSaveErr, redflagSaveRes) {
        // Call the assertion callback
        done(redflagSaveErr);
      });
  });

  it('should not be able to save an Redflag if no name is provided', function (done) {
    // Invalidate name field
    redflag.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Redflag
        agent.post('/api/redflags')
          .send(redflag)
          .expect(400)
          .end(function (redflagSaveErr, redflagSaveRes) {
            // Set message assertion
            (redflagSaveRes.body.message).should.match('Please fill Redflag name');

            // Handle Redflag save error
            done(redflagSaveErr);
          });
      });
  });

  it('should be able to update an Redflag if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Redflag
        agent.post('/api/redflags')
          .send(redflag)
          .expect(200)
          .end(function (redflagSaveErr, redflagSaveRes) {
            // Handle Redflag save error
            if (redflagSaveErr) {
              return done(redflagSaveErr);
            }

            // Update Redflag name
            redflag.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Redflag
            agent.put('/api/redflags/' + redflagSaveRes.body._id)
              .send(redflag)
              .expect(200)
              .end(function (redflagUpdateErr, redflagUpdateRes) {
                // Handle Redflag update error
                if (redflagUpdateErr) {
                  return done(redflagUpdateErr);
                }

                // Set assertions
                (redflagUpdateRes.body._id).should.equal(redflagSaveRes.body._id);
                (redflagUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Redflags if not signed in', function (done) {
    // Create new Redflag model instance
    var redflagObj = new Redflag(redflag);

    // Save the redflag
    redflagObj.save(function () {
      // Request Redflags
      request(app).get('/api/redflags')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Redflag if not signed in', function (done) {
    // Create new Redflag model instance
    var redflagObj = new Redflag(redflag);

    // Save the Redflag
    redflagObj.save(function () {
      request(app).get('/api/redflags/' + redflagObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', redflag.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Redflag with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/redflags/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Redflag is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Redflag which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Redflag
    request(app).get('/api/redflags/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Redflag with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Redflag if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Redflag
        agent.post('/api/redflags')
          .send(redflag)
          .expect(200)
          .end(function (redflagSaveErr, redflagSaveRes) {
            // Handle Redflag save error
            if (redflagSaveErr) {
              return done(redflagSaveErr);
            }

            // Delete an existing Redflag
            agent.delete('/api/redflags/' + redflagSaveRes.body._id)
              .send(redflag)
              .expect(200)
              .end(function (redflagDeleteErr, redflagDeleteRes) {
                // Handle redflag error error
                if (redflagDeleteErr) {
                  return done(redflagDeleteErr);
                }

                // Set assertions
                (redflagDeleteRes.body._id).should.equal(redflagSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Redflag if not signed in', function (done) {
    // Set Redflag user
    redflag.user = user;

    // Create new Redflag model instance
    var redflagObj = new Redflag(redflag);

    // Save the Redflag
    redflagObj.save(function () {
      // Try deleting Redflag
      request(app).delete('/api/redflags/' + redflagObj._id)
        .expect(403)
        .end(function (redflagDeleteErr, redflagDeleteRes) {
          // Set message assertion
          (redflagDeleteRes.body.message).should.match('User is not authorized');

          // Handle Redflag error error
          done(redflagDeleteErr);
        });

    });
  });

  it('should be able to get a single Redflag that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Redflag
          agent.post('/api/redflags')
            .send(redflag)
            .expect(200)
            .end(function (redflagSaveErr, redflagSaveRes) {
              // Handle Redflag save error
              if (redflagSaveErr) {
                return done(redflagSaveErr);
              }

              // Set assertions on new Redflag
              (redflagSaveRes.body.name).should.equal(redflag.name);
              should.exist(redflagSaveRes.body.user);
              should.equal(redflagSaveRes.body.user._id, orphanId);

              // force the Redflag to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Redflag
                    agent.get('/api/redflags/' + redflagSaveRes.body._id)
                      .expect(200)
                      .end(function (redflagInfoErr, redflagInfoRes) {
                        // Handle Redflag error
                        if (redflagInfoErr) {
                          return done(redflagInfoErr);
                        }

                        // Set assertions
                        (redflagInfoRes.body._id).should.equal(redflagSaveRes.body._id);
                        (redflagInfoRes.body.name).should.equal(redflag.name);
                        should.equal(redflagInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Redflag.remove().exec(done);
    });
  });
});
