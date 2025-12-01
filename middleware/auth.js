function adminCheck(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        req.flash('error_msg', 'Ehhez a funkcióhoz admin jogosultság kell.');
        return res.redirect('/');
    }
    next();
}

module.exports = { adminCheck };
