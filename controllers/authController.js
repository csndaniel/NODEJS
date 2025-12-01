const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
    // --------------------
    // REGISZTRÁCIÓ GET
    // --------------------
    getRegister: (req, res) => {
        res.render('auth/register', { title: 'Regisztráció' });
    },

    // --------------------
    // REGISZTRÁCIÓ POST
    // --------------------
    postRegister: (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            req.flash('error_msg', 'Minden mező kitöltése kötelező.');
            return res.redirect('/auth/register');
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {
                if (err) throw err;

                if (results.length > 0) {
                    req.flash('error_msg', 'Ez az email már regisztrálva van.');
                    return res.redirect('/auth/register');
                }

                const hash = bcrypt.hashSync(password, 10);

                db.query(
                    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                    [username, email, hash],
                    (err) => {
                        if (err) throw err;

                        req.flash('success_msg', 'Sikeres regisztráció! Jelentkezz be.');
                        res.redirect('/auth/login');
                    }
                );
            }
        );
    },

    // --------------------
    // LOGIN GET
    // --------------------
    getLogin: (req, res) => {
        res.render('auth/login', { title: 'Bejelentkezés' });
    },

    // --------------------
    // LOGIN POST
    // --------------------

    postLogin: (req, res) => {
        // Ezek BIZTOSAN működni fognak
        const email = req.body.email;
        const password = req.body.password;

        console.log("=== LOGIN ROUTE FUT ===");
        console.log("Email:", email);

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {

                if (err) {
                    console.log("DB error:", err);
                    throw err;
                }

                console.log("DB eredmény:", results);

                // Ha nincs ilyen felhasználó
                if (results.length === 0) {
                    console.log("NINCS ilyen user!");
                    req.flash('error_msg', 'Hibás email vagy jelszó.');
                    return res.redirect('/auth/login');
                }

                const user = results[0];

                // Jelszó ellenőrzés
                const isMatch = bcrypt.compareSync(password, user.password);
                console.log("Password match:", isMatch);

                if (!isMatch) {
                    console.log("ROSSZ jelszó!");
                    req.flash('error_msg', 'Hibás email vagy jelszó.');
                    return res.redirect('/auth/login');
                }

                // Ha minden OK → session létrehozása
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };

                console.log("Sikeres bejelentkezés:", req.session.user);

                req.flash('success_msg', 'Sikeres bejelentkezés!');
                res.redirect('/');
            }
        );
    },


    // --------------------
    // LOGOUT
    // --------------------
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    }
};
