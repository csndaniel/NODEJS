// indito.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const BASE_PATH = process.env.BASE_PATH || '';
const app = express();

// View engine beállítás (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statikus fájlok (reszponzív téma – Solid State)
app.use(BASE_PATH, express.static(path.join(__dirname, 'public')));


// POST adatok feldolgozása
app.use(express.urlencoded({ extended: true }));

// HTTP method override (ha később PUT/DELETE kellene formokkal)
app.use(methodOverride('_method'));

// Session beállítás
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'nagyon_titkos_session_kulcs',
    resave: false,
    saveUninitialized: false,
  })
);

// Flash üzenetek
app.use(flash());

// Saját middleware: flash üzenetek + user globális a view-kban
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.session.user || null;
  res.locals.basePath = BASE_PATH;
  next();
});

// Route-ok behúzása
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adatbazisRoutes = require('./routes/adatbazis');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const pilotakRoutes = require('./routes/pilotak');

// Route-ok használata
app.use(BASE_PATH + '/', indexRoutes);
app.use(BASE_PATH + '/auth', authRoutes);
app.use(BASE_PATH + '/adatbazis', adatbazisRoutes);
app.use(BASE_PATH + '/kapcsolat', contactRoutes);
app.use(BASE_PATH + '/admin', adminRoutes);
app.use(BASE_PATH + '/crud/pilotak', pilotakRoutes);


// Port beállítása
const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});


const adminRegister = require('./routes/adminRegister');
app.use('/admin-reg', adminRegister);
