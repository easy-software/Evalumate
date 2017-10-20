'use strict';

/**
 * Module dependencies
 */
var emasPolicy = require('../policies/emas.server.policy'),
  emas = require('../controllers/emas.server.controller');

module.exports = function(app) {
  // Emas Routes
  app.route('/api/emas').all(emasPolicy.isAllowed)
    .get(emas.list)
    .post(emas.create);

  app.route('/api/emas/:emaId').all(emasPolicy.isAllowed)
    .get(emas.read)
    .put(emas.update)
    .delete(emas.delete);

  // Finish by binding the Ema middleware
  app.param('emaId', emas.emaByID);
};
