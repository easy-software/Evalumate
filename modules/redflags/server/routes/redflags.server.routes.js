'use strict';

/**
 * Module dependencies
 */
var redflagsPolicy = require('../policies/redflags.server.policy'),
  redflags = require('../controllers/redflags.server.controller');

module.exports = function(app) {
  // Redflags Routes
  app.route('/api/redflags').all(redflagsPolicy.isAllowed)
    .get(redflags.list)
    .post(redflags.create);

  app.route('/api/redflags/:redflagId').all(redflagsPolicy.isAllowed)
    .get(redflags.read)
    .put(redflags.update)
    .delete(redflags.delete);

  // Finish by binding the Redflag middleware
  app.param('redflagId', redflags.redflagByID);
};
