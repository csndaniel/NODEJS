const express = require('express');
const router = express.Router();
const db = require('../config/db');

// -----------------------------------------------------
// KAPCSOLAT OLDAL (GET)
// -----------------------------------------------------
router.get('/', (req, res) => {
    res.render('contact', { title: 'Kapcsolat' });
});

// -----------------------------------------------------
// ÜZENET KÜLDÉSE (POST)
// -----------------------------------------------------
router.post('/', (req, res) => {
    const base = req.app.locals.basePath;
    const { nev, email, uzenet } = req.body;

    // Üres mezők ellenőrzése
    if (!nev || !email || !uzenet) {
        req.flash('error_msg', 'Minden mezőt ki kell tölteni!');
        return res.redirect(base + '/kapcsolat');
    }

    // Adatbázisba mentés
    db.query(
        "INSERT INTO uzenetek (nev, email, uzenet) VALUES (?, ?, ?)",
        [nev, email, uzenet],
        (err) => {
            if (err) {
                console.error(err);
                req.flash('error_msg', 'Nem sikerült elküldeni az üzenetet.');
                return res.redirect(base + '/kapcsolat');
            }

            req.flash('success_msg', 'Köszönjük az üzenetet! Hamarosan jelentkezünk.');
            return res.redirect(base + '/kapcsolat');
        }
    );
});

module.exports = router;
