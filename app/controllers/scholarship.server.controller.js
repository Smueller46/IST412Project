const mongoose = require('mongoose');
const scholarships = mongoose.model('scholarship');


exports.renderSearchScholarships = function (req, res,) {
    scholarships.find({ 'approved' : 'true'}, 'title name').exec((err, result) => {
        if (err) {
            // If an error occurs send the error message
            console.log(err)
            // return res.status(400).send({
            //     message: getErrorMessage(err)
            // });
        } else {
            // Send a JSON representation of the article 
            res.render('student/scholarshipSearch', { 
                scholarship: result
            });
        }
    })
}

exports.renderScholarshipEmp = function ( req, res) {
    res.render('employer/emp_schol_upload');
}
exports.renderAdminScholarships = function (req, res, next) {
    res.render('admin/sch')
}

exports.create = function(req, res) {
    // Create a new article object
    const scholarship = new scholarships(req.body);

    // Try saving the article
    scholarship.save((err) => {
        if (err) {
            // If an error occurs send the error message
            // return res.status(400).send({
            //     message: getErrorMessage(err)
        // });
        console.log(err)
        } else {
            // Send a JSON representation of the article 
            res.json(scholarship);
        }
    });
};

exports.showAdminApproved = function (req, res) {
        scholarships.find({ 'approved' : true}).sort('-name').exec((err, result) => {
        if (err) {
            // If an error occurs send the error message
            console.log(err)
            // return res.status(400).send({
            //     message: getErrorMessage(err)
            // });
        } else {
            // Send a JSON representation of the article 
            res.render('admin/Admin_internship', { 
                result: result
            });
        }
    })
}

exports.showApprovedSchol = function (req, res) {
    console.log('showapproved');
        var pendingApproved = [];
        var adminApproved = []; 
            // Use the model 'find' method to get a list of articles
            scholarships.find({  'approved' : false, 'adminRejected' : { $ne : true }} ).sort('-name').exec((err, result) => {
                if (err) {
                    // If an error occurs send the error message
                    console.log(err)
                    // return res.status(400).send({
                    //     message: getErrorMessage(err)
                    // });
                } else {
                    // Send a JSON representation of the article 
                    pendingApproved = result;
    
                    
            
            scholarships.find({  'approved' : true, 'adminRejected' : { $ne : true }} ).sort('-name').exec((err, result) => {
                if (err) {
                    // If an error occurs send the error message
                    console.log(err)
                    // return res.status(400).send({
                    //     message: getErrorMessage(err)
                    // });
                } else {
                    // Send a JSON representation of the article 
                    adminApproved = result; 
                     res.render('admin/Admin_scholarship', { 
                         result: pendingApproved,
                         admin: adminApproved
                     });
    
                }
            });
    
        };    })
    }