'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article1 = mongoose.model('Article1'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, article1;

/**
 * Article routes tests
 */
describe('Article1 CRUD tests', function () {

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

    // Save a user to the test db and create new article
    user.save(function () {
      article1 = {
        title: 'Article1 Title',
        content: 'Article1 Content'
      };

      done();
    });
  });

  it('should be able to save an article1 if logged in', function (done) {
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

        // Save a new article
        agent.post('/api/articles1')
          .send(article1)
          .expect(200)
          .end(function (article1SaveErr, article1SaveRes) {
            // Handle article save error
            if (article1SaveErr) {
              return done(article1SaveErr);
            }

            // Get a list of articles
            agent.get('/api/articles1')
              .end(function (articles1GetErr, articles1GetRes) {
                // Handle article save error
                if (articles1GetErr) {
                  return done(articles1GetErr);
                }

                // Get articles list
                var articles1 = articles1GetRes.body;

                // Set assertions
                (articles1[0].user._id).should.equal(userId);
                (articles1[0].title).should.match('Article1 Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an article1 if not logged in', function (done) {
    agent.post('/api/articles1')
      .send(article1)
      .expect(403)
      .end(function (article1SaveErr, article1SaveRes) {
        // Call the assertion callback
        done(article1SaveErr);
      });
  });

  it('should not be able to save an article1 if no title is provided', function (done) {
    // Invalidate title field
    article1.title = '';

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

        // Save a new article
        agent.post('/api/articles1')
          .send(article1)
          .expect(400)
          .end(function (article1SaveErr, article1SaveRes) {
            // Set message assertion
            (article1SaveRes.body.message).should.match('Title cannot be blank');

            // Handle article save error
            done(article1SaveErr);
          });
      });
  });

  it('should be able to update an article1 if signed in', function (done) {
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

        // Save a new article
        agent.post('/api/articles1')
          .send(article1)
          .expect(200)
          .end(function (article1SaveErr, article1SaveRes) {
            // Handle article save error
            if (article1SaveErr) {
              return done(article1SaveErr);
            }

            // Update article title
            article1.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing article
            agent.put('/api/articles1/' + article1SaveRes.body._id)
              .send(article1)
              .expect(200)
              .end(function (article1UpdateErr, article1UpdateRes) {
                // Handle article update error
                if (article1UpdateErr) {
                  return done(article1UpdateErr);
                }

                // Set assertions
                (article1UpdateRes.body._id).should.equal(article1SaveRes.body._id);
                (article1UpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of articles1 if not signed in', function (done) {
    // Create new article model instance
    var article1Obj = new Article1(article1);

    // Save the article
    article1Obj.save(function () {
      // Request articles
      request(app).get('/api/articles1')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single article1 if not signed in', function (done) {
    // Create new article model instance
    var article1Obj = new Article1(article1);

    // Save the article
    article1Obj.save(function () {
      request(app).get('/api/articles1/' + article1Obj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', article1.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single article1 with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/articles1/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Article1 is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single article1 which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent article1
    request(app).get('/api/articles1/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No article1 with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an article1 if signed in', function (done) {
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

        // Save a new article
        agent.post('/api/articles1')
          .send(article1)
          .expect(200)
          .end(function (article1SaveErr, article1SaveRes) {
            // Handle article save error
            if (article1SaveErr) {
              return done(article1SaveErr);
            }

            // Delete an existing article
            agent.delete('/api/articles1/' + article1SaveRes.body._id)
              .send(article1)
              .expect(200)
              .end(function (article1DeleteErr, article1DeleteRes) {
                // Handle article error error
                if (article1DeleteErr) {
                  return done(article1DeleteErr);
                }

                // Set assertions
                (article1DeleteRes.body._id).should.equal(article1SaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an article1 if not signed in', function (done) {
    // Set article user
    article1.user = user;

    // Create new article model instance
    var article1Obj = new Article1(article1);

    // Save the article
    article1Obj.save(function () {
      // Try deleting article
      request(app).delete('/api/articles1/' + article1Obj._id)
        .expect(403)
        .end(function (article1DeleteErr, article1DeleteRes) {
          // Set message assertion
          (article1DeleteRes.body.message).should.match('User is not authorized');

          // Handle article error error
          done(article1DeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Article1.remove().exec(done);
    });
  });
});
