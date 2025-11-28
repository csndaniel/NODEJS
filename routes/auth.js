const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Regisztráció oldalak
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Bejelentkezés
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Kijelentkezés
router.get('/logout', authController.logout);

module.exports = router;
