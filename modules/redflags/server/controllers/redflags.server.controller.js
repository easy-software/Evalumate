'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Redflag = mongoose.model('Redflag'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Redflag
 */
exports.create = function(req, res) {
  var redflag = new Redflag(req.body);
  redflag.user = req.user;

  redflag.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(redflag);
    }
  });
};

/**
 * Show the current Redflag
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var redflag = req.redflag ? req.redflag.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  redflag.isCurrentUserOwner = req.user && redflag.user && redflag.user._id.toString() === req.user._id.toString();

  res.jsonp(redflag);
};

/**
 * Update a Redflag
 */
exports.update = function(req, res) {
  var redflag = req.redflag;

  redflag = _.extend(redflag, req.body);

  redflag.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(redflag);
    }
  });
};

/**
 * Delete an Redflag
 */
exports.delete = function(req, res) {
  var redflag = req.redflag;

  redflag.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(redflag);
    }
  });
};

/**
 * List of Redflags
 */
exports.list = function(req, res) {
  Redflag.find().sort('-created').populate('user', 'displayName').exec(function(err, redflags) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(redflags);
    }
  });
};

/**
 * Redflag middleware
 */
exports.redflagByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Redflag is invalid'
    });
  }

  Redflag.findById(id).populate('user', 'displayName').exec(function (err, redflag) {
    if (err) {
      return next(err);
    } else if (!redflag) {
      return res.status(404).send({
        message: 'No Redflag with that identifier has been found'
      });
    }
    req.redflag = redflag;
    next();
  });
};
