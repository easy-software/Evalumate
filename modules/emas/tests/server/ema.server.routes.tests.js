'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ema = mongoose.model('Ema'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ema;

/**
 * Ema routes tests
 */
describe('Ema CRUD tests', function () {

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

    // Save a user to the test db and create new Ema
    user.save(function () {
      ema = {
        name: 'Ema name'
      };

      done();
    });
  });

  it('should be able to save a Ema if logged in', function (done) {
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

        // Save a new Ema
        agent.post('/api/emas')
          .send(ema)
          .expect(200)
          .end(function (emaSaveErr, emaSaveRes) {
            // Handle Ema save error
            if (emaSaveErr) {
              return done(emaSaveErr);
            }

            // Get a list of Emas
            agent.get('/api/emas')
              .end(function (emasGetErr, emasGetRes) {
                // Handle Emas save error
                if (emasGetErr) {
                  return done(emasGetErr);
                }

                // Get Emas list
                var emas = emasGetRes.body;

                // Set assertions
                (emas[0].user._id).should.equal(userId);
                (emas[0].name).should.match('Ema name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ema if not logged in', function (done) {
    agent.post('/api/emas')
      .send(ema)
      .expect(403)
      .end(function (emaSaveErr, emaSaveRes) {
        // Call the assertion callback
        done(emaSaveErr);
      });
  });

  it('should not be able to save an Ema if no name is provided', function (done) {
    // Invalidate name field
    ema.name = '';

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

        // Save a new Ema
        agent.post('/api/emas')
          .send(ema)
          .expect(400)
          .end(function (emaSaveErr, emaSaveRes) {
            // Set message assertion
            (emaSaveRes.body.message).should.match('Please fill Ema name');

            // Handle Ema save error
            done(emaSaveErr);
          });
      });
  });

  it('should be able to update an Ema if signed in', function (done) {
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

        // Save a new Ema
        agent.post('/api/emas')
          .send(ema)
          .expect(200)
          .end(function (emaSaveErr, emaSaveRes) {
            // Handle Ema save error
            if (emaSaveErr) {
              return done(emaSaveErr);
            }

            // Update Ema name
            ema.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ema
            agent.put('/api/emas/' + emaSaveRes.body._id)
              .send(ema)
              .expect(200)
              .end(function (emaUpdateErr, emaUpdateRes) {
                // Handle Ema update error
                if (emaUpdateErr) {
                  return done(emaUpdateErr);
                }

                // Set assertions
                (emaUpdateRes.body._id).should.equal(emaSaveRes.body._id);
                (emaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Emas if not signed in', function (done) {
    // Create new Ema model instance
    var emaObj = new Ema(ema);

    // Save the ema
    emaObj.save(function () {
      // Request Emas
      request(app).get('/api/emas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ema if not signed in', function (done) {
    // Create new Ema model instance
    var emaObj = new Ema(ema);

    // Save the Ema
    emaObj.save(function () {
      request(app).get('/api/emas/' + emaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ema.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ema with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/emas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ema is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ema which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ema
    request(app).get('/api/emas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ema with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ema if signed in', function (done) {
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

        // Save a new Ema
        agent.post('/api/emas')
          .send(ema)
          .expect(200)
          .end(function (emaSaveErr, emaSaveRes) {
            // Handle Ema save error
            if (emaSaveErr) {
              return done(emaSaveErr);
            }

            // Delete an existing Ema
            agent.delete('/api/emas/' + emaSaveRes.body._id)
              .send(ema)
              .expect(200)
              .end(function (emaDeleteErr, emaDeleteRes) {
                // Handle ema error error
                if (emaDeleteErr) {
                  return done(emaDeleteErr);
                }

                // Set assertions
                (emaDeleteRes.body._id).should.equal(emaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ema if not signed in', function (done) {
    // Set Ema user
    ema.user = user;

    // Create new Ema model instance
    var emaObj = new Ema(ema);

    // Save the Ema
    emaObj.save(function () {
      // Try deleting Ema
      request(app).delete('/api/emas/' + emaObj._id)
        .expect(403)
        .end(function (emaDeleteErr, emaDeleteRes) {
          // Set message assertion
          (emaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ema error error
          done(emaDeleteErr);
        });

    });
  });

  it('should be able to get a single Ema that has an orphaned user reference', function (done) {
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

          // Save a new Ema
          agent.post('/api/emas')
            .send(ema)
            .expect(200)
            .end(function (emaSaveErr, emaSaveRes) {
              // Handle Ema save error
              if (emaSaveErr) {
                return done(emaSaveErr);
              }

              // Set assertions on new Ema
              (emaSaveRes.body.name).should.equal(ema.name);
              should.exist(emaSaveRes.body.user);
              should.equal(emaSaveRes.body.user._id, orphanId);

              // force the Ema to have an orphaned user reference
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

                    // Get the Ema
                    agent.get('/api/emas/' + emaSaveRes.body._id)
                      .expect(200)
                      .end(function (emaInfoErr, emaInfoRes) {
                        // Handle Ema error
                        if (emaInfoErr) {
                          return done(emaInfoErr);
                        }

                        // Set assertions
                        (emaInfoRes.body._id).should.equal(emaSaveRes.body._id);
                        (emaInfoRes.body.name).should.equal(ema.name);
                        should.equal(emaInfoRes.body.user, undefined);

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
      Ema.remove().exec(done);
    });
  });
});
