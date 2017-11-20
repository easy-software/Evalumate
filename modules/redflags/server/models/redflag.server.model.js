'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Redflag Schema
 */
var RedflagSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Redflag name',
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

mongoose.model('Redflag', RedflagSchema);
