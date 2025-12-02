const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware: csak admin számára
function adminCheck(req, res, next) {
    const base = req.app.locals.basePath;

    if (!req.session.user || req.session.user.role !== 'admin') {
        req.flash('error_msg', 'Ehhez nincs jogosultságod.');
        return res.redirect(base + '/');
    }

    next();
}

// Üzenetek listázása
router.get('/uzenetek', adminCheck, (req, res) => {
    const base = req.app.locals.basePath;

    db.query("SELECT * FROM uzenetek ORDER BY datum DESC", (err, results) => {
        if (err) {
            console.error(err);
            req.flash('error_msg', 'Nem sikerült betölteni az üzeneteket.');
            return res.redirect(base + '/');
        }

        res.render('admin/uzenetek', { 
            title: 'Érkező üzenetek',
            uzenetek: results
        });
    });
});

module.exports = router;
