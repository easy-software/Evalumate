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
  lastSpinDay: {
    type: Number,
    default: new Date().getDate()
  },
  lastSpinMonth: {
    type: Number,
    default: new Date().getMonth()
  },
  lastSpinYear: {
    type: Number,
    default: new Date().getFullYear()
  },
  selectedOptions: {
    type: [Number],
    default: []
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Ways2grow', Ways2growSchema);
