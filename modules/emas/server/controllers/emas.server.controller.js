'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ema = mongoose.model('Ema'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ema
 */
exports.create = function(req, res) {
  var ema = new Ema(req.body);
  ema.user = req.user;

  ema.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ema);
    }
  });
};

/**
 * Show the current Ema
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ema = req.ema ? req.ema.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ema.isCurrentUserOwner = req.user && ema.user && ema.user._id.toString() === req.user._id.toString();

  res.jsonp(ema);
};

/**
 * Update a Ema
 */
exports.update = function(req, res) {
  var ema = req.ema;

  ema = _.extend(ema, req.body);

  ema.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ema);
    }
  });
};

/**
 * Delete an Ema
 */
exports.delete = function(req, res) {
  var ema = req.ema;

  ema.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ema);
    }
  });
};

/**
 * List of Emas
 */
exports.list = function(req, res) {
  Ema.find().sort('-created').populate('user', 'displayName').exec(function(err, emas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(emas);
    }
  });
};

/**
 * Ema middleware
 */
exports.emaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ema is invalid'
    });
  }

  Ema.findById(id).populate('user', 'displayName').exec(function (err, ema) {
    if (err) {
      return next(err);
    } else if (!ema) {
      return res.status(404).send({
        message: 'No Ema with that identifier has been found'
      });
    }
    req.ema = ema;
    next();
  });
};
