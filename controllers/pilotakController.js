const db = require('../config/db');

module.exports = {

    // -----------------------------------------------------
    // LISTA
    // -----------------------------------------------------
    list: (req, res) => {
        const base = req.app.locals.basePath;

        db.query("SELECT * FROM pilotak ORDER BY id ASC", (err, results) => {
            if (err) {
                console.error(err);
                req.flash('error_msg', 'Nem sikerült betölteni a pilótákat.');
                return res.redirect(base + '/');
            }

            res.render('pilotak/index', { 
                title: 'Pilóták CRUD',
                pilotak: results
            });
        });
    },

    // -----------------------------------------------------
    // ÚJ PILÓTA FORM
    // -----------------------------------------------------
    newForm: (req, res) => {
        res.render('pilotak/new', { title: 'Új pilóta' });
    },

    // -----------------------------------------------------
    // ÚJ PILÓTA FELVÉTELE
    // -----------------------------------------------------
    create: (req, res) => {
        const base = req.app.locals.basePath;
        const { nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok } = req.body;

        if (!nev || !szuletesi_ido) {
            req.flash('error_msg', 'A név és születési dátum kötelező.');
            return res.redirect(base + '/crud/pilotak/uj');
        }

        db.query(
            "INSERT INTO pilotak (nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok) VALUES (?, ?, ?, ?, ?)",
            [nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok],
            (err) => {
                if (err) {
                    console.error(err);
                    req.flash('error_msg', 'Hiba történt a mentés közben.');
                    return res.redirect(base + '/crud/pilotak');
                }

                req.flash('success_msg', 'Pilóta sikeresen hozzáadva!');
                return res.redirect(base + '/crud/pilotak');
            }
        );
    },

    // -----------------------------------------------------
    // SZERKESZTÉSI FORM
    // -----------------------------------------------------
    editForm: (req, res) => {
        const base = req.app.locals.basePath;
        const id = req.params.id;

        db.query("SELECT * FROM pilotak WHERE id = ?", [id], (err, results) => {
            if (err) {
                console.error(err);
                req.flash('error_msg', 'Nem sikerült betölteni a pilótát.');
                return res.redirect(base + '/crud/pilotak');
            }

            if (results.length === 0) {
                req.flash('error_msg', 'A pilóta nem található.');
                return res.redirect(base + '/crud/pilotak');
            }

            res.render('pilotak/edit', {
                title: 'Pilóta szerkesztése',
                pilota: results[0]
            });
        });
    },

    // -----------------------------------------------------
    // PILÓTA MÓDOSÍTÁSA
    // -----------------------------------------------------
    update: (req, res) => {
        const base = req.app.locals.basePath;
        const id = req.params.id;
        const { nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok } = req.body;

        db.query(
            "UPDATE pilotak SET nev=?, szuletesi_ido=?, futamgyozelmek=?, pontszam=?, pole_poziciok=? WHERE id=?",
            [nev, szuletesi_ido, futamgyozelmek, pontszam, pole_poziciok, id],
            (err) => {
                if (err) {
                    console.error(err);
                    req.flash('error_msg', 'Nem sikerült menteni a módosítást.');
                    return res.redirect(base + '/crud/pilotak');
                }

                req.flash('success_msg', 'Pilóta módosítva!');
                return res.redirect(base + '/crud/pilotak');
            }
        );
    },

    // -----------------------------------------------------
    // PILÓTA TÖRLÉSE
    // -----------------------------------------------------
    delete: (req, res) => {
        const base = req.app.locals.basePath;
        const id = req.params.id;

        db.query("DELETE FROM pilotak WHERE id = ?", [id], (err) => {
            if (err) {
                console.error(err);
                req.flash('error_msg', 'Nem sikerült törölni a pilótát.');
                return res.redirect(base + '/crud/pilotak');
            }

            req.flash('success_msg', 'Pilóta törölve!');
            return res.redirect(base + '/crud/pilotak');
        });
    }
};
