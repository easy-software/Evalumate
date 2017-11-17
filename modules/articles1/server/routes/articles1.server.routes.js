'use strict';

/**
 * Module dependencies.
 */
var articles1Policy = require('../policies/articles1.server.policy'),
  articles1 = require('../controllers/articles1.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/articles1').all(articles1Policy.isAllowed)
    .get(articles1.list)
    .post(articles1.create);

  // Single article routes
  app.route('/api/articles1/:article1Id').all(articles1Policy.isAllowed)
    .get(articles1.read)
    .put(articles1.update)
    .delete(articles1.delete);

  // Finish by binding the article middleware
  app.param('article1Id', articles1.article1ByID);
};
