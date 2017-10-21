'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Assessment = mongoose.model('Assessment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Assessment
 */
exports.create = function(req, res) {
  var assessment = new Assessment(req.body);
  assessment.user = req.user;

  assessment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assessment);
    }
  });
};

/**
 * Show the current Assessment
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var assessment = req.assessment ? req.assessment.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  assessment.isCurrentUserOwner = req.user && assessment.user && assessment.user._id.toString() === req.user._id.toString();

  res.jsonp(assessment);
};

/**
 * Update a Assessment
 */
exports.update = function(req, res) {
  var assessment = req.assessment;

  assessment = _.extend(assessment, req.body);

  assessment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assessment);
    }
  });
};

/**
 * Delete an Assessment
 */
exports.delete = function(req, res) {
  var assessment = req.assessment;

  assessment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assessment);
    }
  });
};

/**
 * List of Assessments
 */
exports.list = function(req, res) {
  Assessment.find().sort('-created').populate('user', 'displayName').exec(function(err, assessments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(assessments);
    }
  });
};

/**
 * Assessment middleware
 */
exports.assessmentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Assessment is invalid'
    });
  }

  Assessment.findById(id).populate('user', 'displayName').exec(function (err, assessment) {
    if (err) {
      return next(err);
    } else if (!assessment) {
      return res.status(404).send({
        message: 'No Assessment with that identifier has been found'
      });
    }
    req.assessment = assessment;
    next();
  });
};
