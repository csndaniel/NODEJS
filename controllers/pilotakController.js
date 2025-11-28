const db = require('../config/db');

module.exports = {

    // LISTÁZÁS
    list: (req, res) => {
        db.query("SELECT * FROM pilotak", (err, results) => {
            if (err) throw err;
            res.render('pilotak/index', { 
                title: 'Pilóták CRUD',
                pilotak: results
            });
        });
    },

    // ÚJ PILÓTA FORM
    newForm: (req, res) => {
        res.render('pilotak/new', { title: 'Új pilóta' });
    },

    // ÚJ PILÓTA FELVÉTELE
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

    // SZERKESZTŐ FORM
    editForm: (req, res) => {
        const id = req.params.id;

        db.query("SELECT * FROM pilotak WHERE id = ?", [id], (err, results) => {
            if (err) throw err;

            res.render('pilotak/edit', {
                title: 'Pilóta szerkesztése',
                pilota: results[0]
            });
        });
    },

    // SZERKESZTÉS (UPDATE)
    update: (req, res) => {
        const id = req.params.id;
        const { nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok } = req.body;

        db.query(
            "UPDATE pilotak SET nev=?, szuletesi_ido=?, futamgyozelmek=?, pontszam=?, pole_poziciok=? WHERE id=?",
            [nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok, id],
            (err) => {
                if (err) throw err;

                req.flash('success_msg', 'Pilóta sikeresen módosítva!');
                res.redirect('/crud/pilotak');
            }
        );
    },

    // TÖRLÉS
    delete: (req, res) => {
        const id = req.params.id;

        db.query("DELETE FROM pilotak WHERE id = ?", [id], (err) => {
            if (err) throw err;

            req.flash('success_msg', 'Pilóta törölve!');
            res.redirect('/crud/pilotak');
        });
    }
};
