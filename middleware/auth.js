// -------------------------------------------------------------
// ADMIN jogosultság ellenőrzése
// -------------------------------------------------------------
function adminCheck(req, res, next) {
    const base = req.app.locals.basePath;

    if (!req.session.user || req.session.user.role !== 'admin') {
        req.flash('error_msg', 'Ehhez a funkcióhoz admin jogosultság kell.');
        return res.redirect(base + '/');
    }

    next();
}

// -------------------------------------------------------------
// Bejelentkezett felhasználó ellenőrzése
// (opcionális – pl. Üzenetek megtekintéséhez jól jön)
// -------------------------------------------------------------
function isLoggedIn(req, res, next) {
    const base = req.app.locals.basePath;

    if (!req.session.user) {
        req.flash('error_msg', 'A funkció használatához be kell jelentkezned.');
        return res.redirect(base + '/auth/login');
    }

    next();
}

module.exports = { 
    adminCheck,
    isLoggedIn 
};
