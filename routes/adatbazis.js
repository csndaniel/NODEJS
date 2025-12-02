const express = require('express');
const router = express.Router();
const db = require('../config/db');

// -----------------------------------------------------
// PILÓTÁK LISTÁJA
// -----------------------------------------------------
router.get('/pilotak', (req, res) => {
    const base = req.app.locals.basePath;

    db.query("SELECT * FROM pilotak ORDER BY id ASC", (err, results) => {
        if (err) {
            console.error(err);
            req.flash('error_msg', 'Nem sikerült betölteni a pilótákat.');
            return res.redirect(base + '/');
        }

        res.render('adatbazis/pilotak', { 
            title: 'Pilóták',
            pilotak: results
        });
    });
});

// -----------------------------------------------------
// PÁLYÁK LISTÁJA
// -----------------------------------------------------
router.get('/palyak', (req, res) => {
    const base = req.app.locals.basePath;

    db.query("SELECT * FROM palyak ORDER BY id ASC", (err, results) => {
        if (err) {
            console.error(err);
            req.flash('error_msg', 'Nem sikerült betölteni a pályákat.');
            return res.redirect(base + '/');
        }

        res.render('adatbazis/palyak', { 
            title: 'Pályák',
            palyak: results
        });
    });
});

// -----------------------------------------------------
// VERSENYEK LISTÁJA
// -----------------------------------------------------
router.get('/versenyek', (req, res) => {
    const base = req.app.locals.basePath;

    db.query("SELECT * FROM versenyek ORDER BY datum DESC", (err, results) => {
        if (err) {
            console.error(err);
            req.flash('error_msg', 'Nem sikerült betölteni a versenyeket.');
            return res.redirect(base + '/');
        }

        res.render('adatbazis/versenyek', { 
            title: 'Versenyek',
            versenyek: results
        });
    });
});

module.exports = router;
