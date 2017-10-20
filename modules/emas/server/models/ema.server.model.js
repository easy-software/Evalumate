'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ema Schema
 */
var EmaSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Ema name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Ema', EmaSchema);
