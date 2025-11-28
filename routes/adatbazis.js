const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Piloták listája
router.get('/pilotak', (req, res) => {
    db.query("SELECT * FROM pilotak", (err, results) => {
        if (err) throw err;
        res.render('adatbazis/pilotak', { title: 'Pilóták', pilotak: results });
    });
});

// Pályák listája
router.get('/palyak', (req, res) => {
    db.query("SELECT * FROM palyak", (err, results) => {
        if (err) throw err;
        res.render('adatbazis/palyak', { title: 'Pályák', palyak: results });
    });
});

// Versenyek listája
router.get('/versenyek', (req, res) => {
    db.query("SELECT * FROM versenyek", (err, results) => {
        if (err) throw err;
        res.render('adatbazis/versenyek', { title: 'Versenyek', versenyek: results });
    });
});

module.exports = router;
