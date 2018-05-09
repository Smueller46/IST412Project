const User = require('mongoose').model('user');
passport = require('passport');

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

exports.saveFile = function (req, res, next) {

};
//render the signin page
exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('student/signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};
//render the signup page
exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('student/signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};
//signup logic to add user to DB. Will be something like this but not exact
exports.signup = function (req, res, next) {
    if (!req.user) {
       var user = new User(req.body);
        var message = null;
        console.log(req.body)
       user.provider = 'local';
        user.save(function (err) {
            if (err) {
                 var message = getErrorMessage(err);
                 req.flash('error', message);
                console.log(err)
                return res.redirect('/signup',);
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/student/home');
            });
        });
    } else {
        return res.redirect('/');
    }
};


exports.signin = function (req, res) {
    
}

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.create = function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function (req, res, next) {
    User.find({}, 'firstName email', { skip: 10, limit: 10 }, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id: id
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};
exports.listInternships = function (req, res, next) {

}

exports.update = function (req, res, next) {
    console.log(req.body);
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
};

//Oauth???

exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username ||
                    ((profile.email) ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(possibleUsername, null,
                    function (availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);
                        user.save(function (err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                req.flash('error', message);
                                return req.res.redirect('/signup');
                            }
                            return done(err, user);
                        });
                    });
            } else {
                return done(err, user);
            }
        }
    });
};