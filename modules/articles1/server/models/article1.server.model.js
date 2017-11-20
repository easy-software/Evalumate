'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var Article1Schema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  mantra: {
    type: String,
    default: 'Click on the button below to create a mantra!',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Article1', Article1Schema);
