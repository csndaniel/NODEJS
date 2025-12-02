const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
    // -----------------------------------------------------
    // REGISZTRÁCIÓ (GET)
    // -----------------------------------------------------
    getRegister: (req, res) => {
        res.render('auth/register', { 
            title: 'Regisztráció'
        });
    },

    // -----------------------------------------------------
    // REGISZTRÁCIÓ (POST)
    // -----------------------------------------------------
    postRegister: (req, res) => {
        const { username, email, password } = req.body;
        const base = req.app.locals.basePath;

        // Üres mezők ellenőrzése
        if (!username || !email || !password) {
            req.flash('error_msg', 'Minden mező kitöltése kötelező.');
            return res.redirect(base + '/auth/register');
        }

        // Email ellenőrzése
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {

                if (err) {
                    console.error(err);
                    req.flash('error_msg', 'Adatbázis hiba történt.');
                    return res.redirect(base + '/auth/register');
                }

                if (results.length > 0) {
                    req.flash('error_msg', 'Ez az email már regisztrálva van.');
                    return res.redirect(base + '/auth/register');
                }

                // Jelszó hash-elése
                const hash = bcrypt.hashSync(password, 10);

                // Új user felvétele – szerepkörrel!
                db.query(
                    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')",
                    [username, email, hash],
                    (err) => {

                        if (err) {
                            console.error(err);
                            req.flash('error_msg', 'Nem sikerült a regisztráció.');
                            return res.redirect(base + '/auth/register');
                        }

                        req.flash('success_msg', 'Sikeres regisztráció! Jelentkezz be.');
                        return res.redirect(base + '/auth/login');
                    }
                );
            }
        );
    },

    // -----------------------------------------------------
    // LOGIN (GET)
    // -----------------------------------------------------
    getLogin: (req, res) => {
        res.render('auth/login', { title: 'Bejelentkezés' });
    },

    // -----------------------------------------------------
    // LOGIN (POST)
    // -----------------------------------------------------
    postLogin: (req, res) => {
        const { email, password } = req.body;
        const base = req.app.locals.basePath;

        if (!email || !password) {
            req.flash('error_msg', 'Minden mező kitöltése kötelező.');
            return res.redirect(base + '/auth/login');
        }

        // Felhasználó keresése email szerint
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {

                if (err) {
                    console.error(err);
                    req.flash('error_msg', 'Adatbázis hiba.');
                    return res.redirect(base + '/auth/login');
                }

                if (results.length === 0) {
                    req.flash('error_msg', 'Hibás email vagy jelszó.');
                    return res.redirect(base + '/auth/login');
                }

                const user = results[0];

                // Jelszó ellenőrzés
                const isMatch = bcrypt.compareSync(password, user.password);
                if (!isMatch) {
                    req.flash('error_msg', 'Hibás email vagy jelszó.');
                    return res.redirect(base + '/auth/login');
                }

                // Sikeres bejelentkezés → session-ben tárolás
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };

                req.flash('success_msg', 'Sikeres bejelentkezés!');
                return res.redirect(base + '/');
            }
        );
    },

    // -----------------------------------------------------
    // KIJELENTKEZÉS
    // -----------------------------------------------------
    logout: (req, res) => {
        const base = req.app.locals.basePath;
        req.session.destroy(() => {
            return res.redirect(base + '/auth/login');
        });
    }
};
