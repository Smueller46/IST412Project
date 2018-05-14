const internship = require('mongoose').model('internship');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const model = require('mongoose').model('user');
const applicantSchema = new Schema({
    internship : [{type: Schema.Types.ObjectId, ref: 'internship'}],
    user : [{type: Schema.Types.ObjectId, ref: 'user' }],
    contactEmail : String,
    contactPhone: { 
        type: String,
		validate: {
			validator: function(v) {
				return /\d{3}-\d{3}-\d{4}/.test(v);
					},
					message: '{VALUE} is not a valid phone number!'
        }, 
        resume : String
    }
});
mongoose.model('application', applicantSchema)