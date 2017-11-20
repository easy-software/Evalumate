'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ways2grow Schema
 */
var Ways2growSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Ways2grow name',
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

mongoose.model('Ways2grow', Ways2growSchema);
