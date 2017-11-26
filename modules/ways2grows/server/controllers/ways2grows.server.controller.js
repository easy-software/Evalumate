'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ways2grow = mongoose.model('Ways2grow'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ways2grow
 */
exports.create = function(req, res) {
  var ways2grow = new Ways2grow(req.body);
  ways2grow.user = req.user;

  ways2grow.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //res.jsonp(ways2grow);
      res.json(ways2grow);
    }
  });
};

/**
 * Show the current Ways2grow
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  //var ways2grow = req.ways2grow ? req.ways2grow.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  //ways2grow.isCurrentUserOwner = req.user && ways2grow.user && ways2grow.user._id.toString() === req.user._id.toString();

  //res.jsonp(ways2grow);
  res.json(req.ways2grow);
};

/**
 * Update a Ways2grow
 */
exports.update = function(req, res) {
  /*var ways2grow = req.ways2grow;

  ways2grow = _.extend(ways2grow, req.body);

  ways2grow.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ways2grow);
    }
  });*/
  var ways2grow = req.ways2grow;

  ways2grow.lastSpinDay = req.body.lastSpinDay;
  ways2grow.lastSpinMonth = req.body.lastSpinMonth;
  ways2grow.lastSpinYear = req.body.lastSpinYear;
  ways2grow.selectedOptions = req.body.selectedOptions;

  ways2grow.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ways2grow);
    }
  });
};

/**
 * Delete an Ways2grow
 */
exports.delete = function(req, res) {
  var ways2grow = req.ways2grow;

  ways2grow.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ways2grow);
    }
  });
};

/**
 * List of Ways2grows
 */
exports.list = function(req, res) {
  Ways2grow.find({'user': req.user.id }).sort('-created').populate('user', 'displayName').exec(function(err, ways2grows) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ways2grows);
    }
  });
};

/**
 * Ways2grow middleware
 */
exports.ways2growByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ways2grow is invalid'
    });
  }

  Ways2grow.findById(id).populate('user', 'displayName').exec(function (err, ways2grow) {
    if (err) {
      return next(err);
    } else if (!ways2grow) {
      return res.status(404).send({
        message: 'No Ways2grow with that identifier has been found'
      });
    }
    req.ways2grow = ways2grow;
    next();
  });
};
