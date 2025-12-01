const db = require('../config/db');

module.exports = {

    list: (req, res) => {
        db.query("SELECT * FROM pilotak", (err, results) => {
            if (err) throw err;
            res.render('pilotak/index', { 
                title: 'Pilóták CRUD',
                pilotak: results
            });
        });
    },

    newForm: (req, res) => {
        res.render('pilotak/new', { title: 'Új pilóta' });
    },

    create: (req, res) => {
        const { nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok } = req.body;

        db.query(
            "INSERT INTO pilotak (nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok) VALUES (?, ?, ?, ?, ?)",
            [nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok],
            (err) => {
                if (err) throw err;

                req.flash('success_msg', 'Pilóta sikeresen hozzáadva!');
                res.redirect('/crud/pilotak');
            }
        );
    },

    editForm: (req, res) => {
        const id = req.params.id;

        db.query("SELECT * FROM pilotak WHERE id = ?", [id], (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                req.flash('error_msg', 'A pilóta nem található.');
                return res.redirect('/crud/pilotak');
            }

            res.render('pilotak/edit', {
                title: 'Pilóta szerkesztése',
                pilota: results[0]
            });
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const { nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok } = req.body;

        db.query(
            "UPDATE pilotak SET nev=?, szuletesi_ido=?, futamgyozelmek=?, pontszam=?, pole_poziciok=? WHERE id=?",
            [nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok, id],
            (err) => {
                if (err) throw err;

                req.flash('success_msg', 'Pilóta módosítva!');
                res.redirect('/crud/pilotak');
            }
        );
    },

    delete: (req, res) => {
        const id = req.params.id;

        db.query("DELETE FROM pilotak WHERE id = ?", [id], (err) => {
            if (err) throw err;

            req.flash('success_msg', 'Pilóta törölve!');
            res.redirect('/crud/pilotak');
        });
    }
};
