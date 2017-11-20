'use strict';

/**
 * Module dependencies
 */
var ways2growsPolicy = require('../policies/ways2grows.server.policy'),
  ways2grows = require('../controllers/ways2grows.server.controller');

module.exports = function(app) {
  // Ways2grows Routes
  app.route('/api/ways2grows').all(ways2growsPolicy.isAllowed)
    .get(ways2grows.list)
    .post(ways2grows.create);

  app.route('/api/ways2grows/:ways2growId').all(ways2growsPolicy.isAllowed)
    .get(ways2grows.read)
    .put(ways2grows.update)
    .delete(ways2grows.delete);

  // Finish by binding the Ways2grow middleware
  app.param('ways2growId', ways2grows.ways2growByID);
};
