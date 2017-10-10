var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var listingSchema = new Schema({
	username: { type: String, required: true , unique: true},
	profile: {name: String,bio: String},
	journal: String,
	created_at: Date,
	updated_at: Date
});


listingSchema.pre('save', function(next) {
	var current = new Date();
	this.updated_at = current;

	if(!current.created_at){
		this.created_at = current;
	}
	next();

});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;