const User = require('mongoose').model('User');
passport = require('passport');

exports.renderHome = function (req, res, next) {
    if(req.isAuthenticated()) { console.log(req.user.role);
        console.log(req.user.username);
        res.render('student/home', {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            phone: req.user.phone,
            email: req.user.email,
            address: req.user.localAdress,
            gradYear: req.user.gradYear,
            gpa: req.user.gpa,
            industry: req.user.industry,
            birthdate: req.user.birthdate,
            securityQuestion: req.user.securityQuestion
            
           
        }
     
    )
    }
    else {
        return res.send(401);
    };
};

exports.saveFile = function (req, res, next) {

};

exports.renderAppInternship = function (req, res, next) {
    // if(req.isAuthenticated()) {
        res.render('student/internshipApplication')
    
};

exports.renderSearchInternship = function (req, res, next) {
    // if(req.isAuthenticated()) {
        res.render('student/internshipSearch')
}
