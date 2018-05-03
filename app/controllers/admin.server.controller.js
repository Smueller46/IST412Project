// Load the module dependencies
const mongoose = require('mongoose');
// const Article = mongoose.model('Article');
const Internship = mongoose.model('Internship');
const scholarships = mongoose.model('scholarship');

function getErrorMessage(err) {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message =
                err.errors[errName].message;
        }
    }
    return message;
};


exports.renderApproval = function (req, res) {
    res.render('admin/Admin_internship')
}

exports.showApproved = function (req, res) {
console.log('showapproved');
    var pendingApproved = [];
    var adminApproved = []; 
        // Use the model 'find' method to get a list of articles
        Internship.find({  'approved' : false, 'adminRejected' : { $ne : true }} ).sort('-name').exec((err, result) => {
            if (err) {
                // If an error occurs send the error message
                console.log(err)
                // return res.status(400).send({
                //     message: getErrorMessage(err)
                // });
            } else {
                // Send a JSON representation of the article 
                pendingApproved = result;

                
        
        Internship.find({  'approved' : true, 'adminRejected' : { $ne : true }} ).sort('-name').exec((err, result) => {
            if (err) {
                // If an error occurs send the error message
                console.log(err)
                // return res.status(400).send({
                //     message: getErrorMessage(err)
                // });
            } else {
                // Send a JSON representation of the article 
                adminApproved = result; 
                 res.render('admin/Admin_internship', { 
                     result: pendingApproved,
                     admin: adminApproved
                 });

            }
        });

    };    })
}

    exports.showAdminApproved = function (req, res) {
        Internship.find({ 'approved' : true}).sort('-name').exec((err, result) => {
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

    exports.read = function (req, res) {
        Internship.find({adminApproved : 'true'}, 'title name').exec((err, result) => {
            if (err) {
                // If an error occurs send the error message
                console.log(err)
                // return res.status(400).send({
                //     message: getErrorMessage(err)
                // });
            } else {
                // Send a JSON representation of the article 
                res.render('student/internshipSearch', { 
                    internship: result
                });
            }
        })
    }
    exports.update = function(req, res) {
        //Get the article from the 'request' object
        if (req.body.status == 'rejected') {
            
            rejectList = req.body.rejectList;
            
            rejectList.forEach(function(value) {
                valuetrim = value.trim();
                // console.log(value);
                Internship.findByIdAndUpdate(valuetrim, {adminRejected: 'true'}, function (err, internship) {
                    if (err) {
                        // If an error occurs send the error message
                        console.log(err)
                        // return res.status(400).send({
                        //       message: getErrorMessage(err)
                        // });
                    } else {
                        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                        res.redirect('/admin');
                        console.log('redirected');
                    }
                })
            })
        }

        else if (req.body.status == 'approved') {
            console.log(req.body.approveList);
            approveList = req.body.approveList;

            approveList.forEach(function(value) {
                valuetrim = value.trim();
                Internship.findByIdAndUpdate(valuetrim, {approved: 'true' }, function (err, internship) {
                    if (err) {
                        // If an error occurs send the error message
                        return res.status(400).send({
                            err
                          //  message: getErrorMessage(err)
                        });
                    } else {
                        //sharatthh
                        res.redirect('back');
                    }
                })
            })
        }
        const internship = req.internship;
        console.log(req.body.status);
    };

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

        exports.updateSchol = function(req, res) {
            //Get the article from the 'request' object
            if (req.body.status == 'rejected') {
                
                rejectList = req.body.rejectList;
                
                rejectList.forEach(function(value) {
                    valuetrim = value.trim();
                    // console.log(value);
                    scholarships.findByIdAndUpdate(valuetrim, {adminRejected: 'true'}, function (err, scholarships) {
                        if (err) {
                            // If an error occurs send the error message
                            console.log(err)
                            // return res.status(400).send({
                            //       message: getErrorMessage(err)
                            // });
                        } else {
                            //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                            res.redirect('/admin');
                            console.log('redirected');
                        }
                    })
                })
            }
    
            else if (req.body.status == 'approved') {
                console.log(req.body.approveList);
                approveList = req.body.approveList;
    
                approveList.forEach(function(value) {
                    valuetrim = value.trim();
                    scholarships.findByIdAndUpdate(valuetrim, {approved: 'true' }, function (err, internship) {
                        if (err) {
                            // If an error occurs send the error message
                            return res.status(400).send({
                                err
                              //  message: getErrorMessage(err)
                            });
                        } else {
                            //sharatthh
                            res.redirect('back');
                        }
                    })
                })
            }
            console.log(req.body.status);
        };