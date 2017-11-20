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
  lastSpin: {
    type: Date,
    default: Date.now
  },
  selectedOptions: {
    type: [Number],
    default: []
  },
  spinCounter: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Ways2grow', Ways2growSchema);
