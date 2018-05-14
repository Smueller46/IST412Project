const mongoose = require('mongoose');
const User = mongoose.model('user');
passport = require('passport');
const Internship = mongoose.model('internship');
const scholarships = mongoose.model('scholarship');
exports.renderHome = function (req, res, next) {
    if(req.isAuthenticated()) { console.log(req.user.role);
        console.log(req.user.username);
        res.render('student/home', {
            // firstName: req.user.firstName,
            // lastName: req.user.lastName,
            // phone: req.user.phone,
            // email: req.user.email,
            // address: req.user.localAdress,
            // gradYear: req.user.gradYear,
            // gpa: req.user.gpa,
            // industry: req.user.industry,
            // birthdate: req.user.birthdate,
            // securityQuestion: req.user.securityQuestion,
            // city: req.user.city,
            // state: req.user.state
            student: req.user     
        }

    )
    }
    else {
        return res.send(401);
    };
};

exports.saveFile = function (req, res, next) {

};


exports.renderSearchResults = function (req, res, next) {
    var name = req.body.search;
    console.log(name);
    Internship.find ({'approved' : true, $text : { $search: name}
    }).exec ((err, result) => {
            if (err) {
                //do error stuff
                console.log(err);
            }
            else {
                scholarships.find({ 'approved' : true ,  
                $text : { $search: name}})
                .exec ((err, scholarship) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.render('student/searchresults', {
                                    internships: result,
                                    scholarships: scholarship
                                })
                            }
                })
            }
        })}

