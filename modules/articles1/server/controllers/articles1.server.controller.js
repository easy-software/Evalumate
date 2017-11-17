'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article1 = mongoose.model('Article1'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
  var article1 = new Article1(req.body);
  article1.user = req.user;

  article1.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article1);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.article1);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var article1 = req.article1;

  article1.title = req.body.title;
  article1.content = req.body.content;
  article1.mantra = req.body.mantra;

  article1.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article1);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article1 = req.article1;

  article1.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article1);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Article1.find().sort('-created').populate('user', 'displayName').exec(function (err, articles1) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles1);
    }
  });
};

/**
 * Article middleware
 */
exports.article1ByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article1 is invalid'
    });
  }

  Article1.findById(id).populate('user', 'displayName').exec(function (err, article1) {
    if (err) {
      return next(err);
    } else if (!article1) {
      return res.status(404).send({
        message: 'No article1 with that identifier has been found'
      });
    }
    req.article1 = article1;
    next();
  });
};
