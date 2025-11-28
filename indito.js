require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

// View engine beállítás (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statikus fájlok (reszponzív téma ide fog jönni majd)
app.use(express.static(path.join(__dirname, 'public')));

// POST adatok feldolgozása
app.use(express.urlencoded({ extended: true }));

// HTTP method override (PUT, DELETE formokhoz)
app.use(methodOverride('_method'));

// Session beállítás
app.use(
  session({
    secret: 'nagyon_titkos_session_kulcs', // később .env-be is tehetjük
    resave: false,
    saveUninitialized: false,
  })
);

// Flash üzenetek
app.use(flash());

// Saját middleware: flash üzenetek + user globálissá tétele view-khoz
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.session.user || null; // később authnál kitöltjük
  next();
});

// Route-ok behúzása
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Port beállítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const adatbazisRoutes = require('./routes/adatbazis');
app.use('/adatbazis', adatbazisRoutes);
const contactRoutes = require('./routes/contact');
app.use('/kapcsolat', contactRoutes);
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);
