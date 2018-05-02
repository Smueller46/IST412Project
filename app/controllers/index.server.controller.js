exports.render = function (req, res, next) {
    res.render('public/portal' );
};

exports.renderError = function (req, res) {
    res.render('public/nyancaterror')
}