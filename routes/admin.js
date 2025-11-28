const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware: csak adminnak
function adminCheck(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        req.flash('error_msg', 'Ehhez nincs jogosultságod.');
        return res.redirect('/');
    }
    next();
}

// Üzenetek listázása
router.get('/uzenetek', adminCheck, (req, res) => {
    db.query("SELECT * FROM uzenetek ORDER BY datum DESC", (err, results) => {
        if (err) throw err;
        res.render('admin/uzenetek', { 
            title: 'Érkező üzenetek', 
            uzenetek: results 
        });
    });
});

module.exports = router;
