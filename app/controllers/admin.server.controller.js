// Load the module dependencies
const mongoose = require('mongoose');
// const Article = mongoose.model('Article');
const Internship = mongoose.model('Internship');
const scholarships = mongoose.model('scholarship');

exports.renderApproval = function (req, res) {
    res.render('admin/Admin_internship')
}

exports.showApproved = function (req, res) {
        // Use the model 'find' method to get a list of articles
        Internship.find({  'approved' : false }, 'title name' ).sort('-name').toArray((err, internship) => {
            if (err) {
                // If an error occurs send the error message
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                // Send a JSON representation of the article 
                res.json(internship);
            }
        });
    };
}