const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

router.get('/', (req, res) => {

    const hash = bcrypt.hashSync('Aa123456', 10);

    db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        ['admin', 'admin@admin.hu', hash, 'admin'],
        (err) => {
            if (err) throw err;
            res.send("ADMIN LETREHOZVA. Hash: " + hash);
        }
    );
});

module.exports = router;
