'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Assessment Schema
 */
var AssessmentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Assessment name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  result: {
    type: Number,
    default:  0
  }
});

var emailSchema = new Schema({
  email1: {
    type: String,
    default: '',
  },
   email2: {
    type: String,
    default: '',
  },
   email3: {
    type: String,
    default: '',
  },
   user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  
});



mongoose.model('email', emailSchema);

mongoose.model('Assessment', AssessmentSchema);
