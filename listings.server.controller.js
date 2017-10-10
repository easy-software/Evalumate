var mongoose = require('mongoose'), 
    Listing = require('../listings.server.schema.js');

exports.create = function(req, res) {

  var listing = new Listing(req.body);

  if(req.results) {
    listing.username = req.results.username
    };
  }

  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.listing);
};

exports.update = function(req, res) {
  var listing = req.listing;

  if(req.results) {
    listing.profile = {
      name: req.results.name, 
      bio: req.results.bio
    };
  }
	
  listing.journal = req.body.journal;
	
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

exports.delete = function(req, res) {
  var listing = req.listing;

  listing.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  })
};

};