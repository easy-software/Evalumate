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
    //required: 'Please fill Assessment name',
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
  result: [{
    name:{
      type: String,
      default: ''
    },
    score: {
      type: Number,
      default:  0
    }
  }],
	email1 : {
		address: {
			type: String,
			default: ''
		},
		hasResponded: {
			type: Boolean,
			default: false
		},
		score: {
			type: Number,
			default: 0
		}
	},
	email2 : {
		address: {
			type: String,
			default: ''
		},
		hasResponded: {
			type: Boolean,
			default: false
		},
		score: {
			type: Number,
			default: 0
		}
	},
	email3 : {
		address: {
			type: String,
			default: ''
		},
		hasResponded: {
			type: Boolean,
			default: false
		},
		score: {
			type: Number,
			default: 0
		}
	}


});

mongoose.model('Assessment', AssessmentSchema);
