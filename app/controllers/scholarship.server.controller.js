const mongoose = require('mongoose');
const scholarships = mongoose.model('scholarship');


exports.renderSearchScholarships = function (req, res,) {
    res.render('student/scholarshipSearch');
}