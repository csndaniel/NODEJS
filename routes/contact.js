 const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Kapcsolat oldal (GET)
router.get('/', (req, res) => {
    res.render('contact', { title: 'Kapcsolat' });
});

// Üzenet küldése (POST)
router.post('/', (req, res) => {
    const { nev, email, uzenet } = req.body;

    if (!nev || !email || !uzenet) {
        req.flash('error_msg', 'Minden mezőt ki kell tölteni!');
        return res.redirect('/kapcsolat');
    }

    db.query(
        "INSERT INTO uzenetek (nev, email, uzenet) VALUES (?, ?, ?)",
        [nev, email, uzenet],
        (err) => {
            if (err) throw err;

            req.flash('success_msg', 'Köszönjük az üzenetet! Hamarosan jelentkezünk.');
            res.redirect('/kapcsolat');
        }
    );
});

module.exports = router;
