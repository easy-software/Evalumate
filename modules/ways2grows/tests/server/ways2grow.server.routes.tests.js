'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ways2grow = mongoose.model('Ways2grow'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ways2grow;

/**
 * Ways2grow routes tests
 */
describe('Ways2grow CRUD tests', function () {

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

    // Save a user to the test db and create new Ways2grow
    user.save(function () {
      ways2grow = {
        name: 'Ways2grow name'
      };

      done();
    });
  });

  it('should be able to save a Ways2grow if logged in', function (done) {
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

        // Save a new Ways2grow
        agent.post('/api/ways2grows')
          .send(ways2grow)
          .expect(200)
          .end(function (ways2growSaveErr, ways2growSaveRes) {
            // Handle Ways2grow save error
            if (ways2growSaveErr) {
              return done(ways2growSaveErr);
            }

            // Get a list of Ways2grows
            agent.get('/api/ways2grows')
              .end(function (ways2growsGetErr, ways2growsGetRes) {
                // Handle Ways2grows save error
                if (ways2growsGetErr) {
                  return done(ways2growsGetErr);
                }

                // Get Ways2grows list
                var ways2grows = ways2growsGetRes.body;

                // Set assertions
                (ways2grows[0].user._id).should.equal(userId);
                (ways2grows[0].name).should.match('Ways2grow name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ways2grow if not logged in', function (done) {
    agent.post('/api/ways2grows')
      .send(ways2grow)
      .expect(403)
      .end(function (ways2growSaveErr, ways2growSaveRes) {
        // Call the assertion callback
        done(ways2growSaveErr);
      });
  });

  it('should not be able to save an Ways2grow if no name is provided', function (done) {
    // Invalidate name field
    ways2grow.name = '';

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

        // Save a new Ways2grow
        agent.post('/api/ways2grows')
          .send(ways2grow)
          .expect(400)
          .end(function (ways2growSaveErr, ways2growSaveRes) {
            // Set message assertion
            (ways2growSaveRes.body.message).should.match('Please fill Ways2grow name');

            // Handle Ways2grow save error
            done(ways2growSaveErr);
          });
      });
  });

  it('should be able to update an Ways2grow if signed in', function (done) {
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

        // Save a new Ways2grow
        agent.post('/api/ways2grows')
          .send(ways2grow)
          .expect(200)
          .end(function (ways2growSaveErr, ways2growSaveRes) {
            // Handle Ways2grow save error
            if (ways2growSaveErr) {
              return done(ways2growSaveErr);
            }

            // Update Ways2grow name
            ways2grow.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ways2grow
            agent.put('/api/ways2grows/' + ways2growSaveRes.body._id)
              .send(ways2grow)
              .expect(200)
              .end(function (ways2growUpdateErr, ways2growUpdateRes) {
                // Handle Ways2grow update error
                if (ways2growUpdateErr) {
                  return done(ways2growUpdateErr);
                }

                // Set assertions
                (ways2growUpdateRes.body._id).should.equal(ways2growSaveRes.body._id);
                (ways2growUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ways2grows if not signed in', function (done) {
    // Create new Ways2grow model instance
    var ways2growObj = new Ways2grow(ways2grow);

    // Save the ways2grow
    ways2growObj.save(function () {
      // Request Ways2grows
      request(app).get('/api/ways2grows')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ways2grow if not signed in', function (done) {
    // Create new Ways2grow model instance
    var ways2growObj = new Ways2grow(ways2grow);

    // Save the Ways2grow
    ways2growObj.save(function () {
      request(app).get('/api/ways2grows/' + ways2growObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ways2grow.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ways2grow with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/ways2grows/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ways2grow is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ways2grow which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ways2grow
    request(app).get('/api/ways2grows/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ways2grow with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ways2grow if signed in', function (done) {
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

        // Save a new Ways2grow
        agent.post('/api/ways2grows')
          .send(ways2grow)
          .expect(200)
          .end(function (ways2growSaveErr, ways2growSaveRes) {
            // Handle Ways2grow save error
            if (ways2growSaveErr) {
              return done(ways2growSaveErr);
            }

            // Delete an existing Ways2grow
            agent.delete('/api/ways2grows/' + ways2growSaveRes.body._id)
              .send(ways2grow)
              .expect(200)
              .end(function (ways2growDeleteErr, ways2growDeleteRes) {
                // Handle ways2grow error error
                if (ways2growDeleteErr) {
                  return done(ways2growDeleteErr);
                }

                // Set assertions
                (ways2growDeleteRes.body._id).should.equal(ways2growSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ways2grow if not signed in', function (done) {
    // Set Ways2grow user
    ways2grow.user = user;

    // Create new Ways2grow model instance
    var ways2growObj = new Ways2grow(ways2grow);

    // Save the Ways2grow
    ways2growObj.save(function () {
      // Try deleting Ways2grow
      request(app).delete('/api/ways2grows/' + ways2growObj._id)
        .expect(403)
        .end(function (ways2growDeleteErr, ways2growDeleteRes) {
          // Set message assertion
          (ways2growDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ways2grow error error
          done(ways2growDeleteErr);
        });

    });
  });

  it('should be able to get a single Ways2grow that has an orphaned user reference', function (done) {
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

          // Save a new Ways2grow
          agent.post('/api/ways2grows')
            .send(ways2grow)
            .expect(200)
            .end(function (ways2growSaveErr, ways2growSaveRes) {
              // Handle Ways2grow save error
              if (ways2growSaveErr) {
                return done(ways2growSaveErr);
              }

              // Set assertions on new Ways2grow
              (ways2growSaveRes.body.name).should.equal(ways2grow.name);
              should.exist(ways2growSaveRes.body.user);
              should.equal(ways2growSaveRes.body.user._id, orphanId);

              // force the Ways2grow to have an orphaned user reference
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

                    // Get the Ways2grow
                    agent.get('/api/ways2grows/' + ways2growSaveRes.body._id)
                      .expect(200)
                      .end(function (ways2growInfoErr, ways2growInfoRes) {
                        // Handle Ways2grow error
                        if (ways2growInfoErr) {
                          return done(ways2growInfoErr);
                        }

                        // Set assertions
                        (ways2growInfoRes.body._id).should.equal(ways2growSaveRes.body._id);
                        (ways2growInfoRes.body.name).should.equal(ways2grow.name);
                        should.equal(ways2growInfoRes.body.user, undefined);

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
      Ways2grow.remove().exec(done);
    });
  });
});
