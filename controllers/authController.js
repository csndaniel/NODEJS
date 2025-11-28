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
        const { email, password } = req.body;

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {
                if (err) throw err;

                if (results.length === 0) {
                    req.flash('error_msg', 'Hibás email vagy jelszó.');
                    return res.redirect('/auth/login');
                }

                const user = results[0];

                if (!bcrypt.compareSync(password, user.password)) {
                    req.flash('error_msg', 'Hibás email vagy jelszó.');
                    return res.redirect('/auth/login');
                }

                req.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    email: user.email
                };

                req.flash('success_msg', `Szia ${user.username}, sikeresen bejelentkeztél!`);
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
