// Load the module dependencies
const mongoose = require('mongoose');
// const Article = mongoose.model('Article');
const Internship = mongoose.model('internship');
const scholarships = mongoose.model('scholarship');
const application = mongoose.model('application');
// Create a new error handling controller method
const getErrorMessage = function(err) {
    if (err.errors) {
        for (const errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.renderInternships = function  ( req, res) {
    res.render('employer/Emp_int_upload')

}
// Create a new controller method that creates new articles
exports.create = function(req, res) {
    // Create a new article object
    const internship = new Internship(req.body);

    // Set the article's 'creator' property
    // article.creator = req.user;

    // Try saving the article
    internship.save((err) => {
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

// Create a new controller method that retrieves a list of articles
exports.findInternship = function(req, res) {
    // Use the model 'find' method to get a list of articles
    Internship.find({  '' : req.name }, 'title name' ).sort('-name').toArray((err, internship) => {
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

// Create a new controller method that returns an existing article
exports.read = function(req, res) {
    res.json(req.article);
};

// Create a new controller method that updates an existing article
exports.update = function(req, res) {
    // Get the article from the 'request' object
    const article = req.article;

    // Update the article fields
    article.title = req.body.title;
    article.content = req.body.content;

    // Try saving the updated article
    article.save((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article 
            res.json(article);
        }
    });
};

// Create a new controller method that delete an existing article
exports.delete = function(req, res) {
    // Get the article from the 'request' object
    const article = req.article;

    // Use the model 'remove' method to delete the article
    article.remove((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article 
            res.json(article);
        }
    });
};

// Create a new controller middleware that retrieves a single existing article
exports.articleByID = function(req, res, next, id) {
    // Use the model 'findById' method to find a single article 
    Article.findById(id).populate('creator', 'firstName lastName fullName').exec((err, article) => {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));

        // If an article is found use the 'request' object to pass it to the next middleware
        req.article = article;

        // Call the next middleware
        next();
    });
};
exports.search = function (req, res, next) {
    Internship.find( req.name  )
}
// Create a new controller middleware that is used to authorize an article operation 
exports.hasAuthorization = function(req, res, next) {
    // If the current user is not the creator of the article send the appropriate error message
    if (req.article.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }

    // Call the next middleware
    next();
};

exports.renderSearchInternship = function (req, res) {
    Internship.find({ 'approved' : true }).exec((err, result) => {
        if (err) {
            // If an error occurs send the error message
            console.log(err)
            // return res.status(400).send({
            //     message: getErrorMessage(err)
            // });
        } else {
           // Send a JSON representation of the article 
            res.render('student/internshipSearch', { 
                result: result
        });
        }
    })
}

exports.renderAppInternship = function (req, res, next) {
    // if(req.isAuthenticated()) {
       
        Internship.findById(req.params.id, function (err, result)  {
            if (err) {
                // If an error occurs send the error message
            console.log(err)
            // return res.status(400).send({
            //     message: getErrorMessage(err)
            // });
        } else {
        
             if (result.skills.includes(',')) {
                 var skillsArray = result.skills.split(',');
                 res.render('student/internshipApplication', {
                    internship: result,
                    skills: skillsArray

                })
             }
             else {          
           res.render('student/internshipApplication', {
            internship: result
        })}
            }
        })
    
};

exports.appInternship = function (req, res) {
    console.log(req.user._id);
    console.log(req.params.id);
    var apply = new application( {
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
         internship : req.params.id,
         user : req.user._id
     }); 
     apply.save((err) => {
        if (err) {
            // If an error occurs send the error message
            // return res.status(400).send({
            //     message: getErrorMessage(err)
        // });
        console.log(err)
        } else {
            // Send a JSON representation of the article 
            res.json(apply);
        }
    });
};
