'use strict';

/**
 * Module dependencies
 */
var assessmentsPolicy = require('../policies/assessments.server.policy'),
  assessments = require('../controllers/assessments.server.controller');

module.exports = function(app) {
  // Assessments Routes
  app.route('/api/assessments').all(assessmentsPolicy.isAllowed)
    .get(assessments.list)
    .post(assessments.create);

  app.route('/api/assessments/:assessmentId').all(assessmentsPolicy.isAllowed)
    .get(assessments.read)
    .put(assessments.update)
    .delete(assessments.delete);

  // Finish by binding the Assessment middleware
  app.param('assessmentId', assessments.assessmentByID);
};
