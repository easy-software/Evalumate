'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ways2grow = mongoose.model('Ways2grow');

/**
 * Globals
 */
var user,
  ways2grow;

/**
 * Unit tests
 */
describe('Ways2grow Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      ways2grow = new Ways2grow({
        name: 'Ways2grow Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return ways2grow.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      ways2grow.name = '';

      return ways2grow.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Ways2grow.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
