const express = require('express');
const router = express.Router();
const pilotakController = require('../controllers/pilotakController.js');

// Listázás
router.get('/', pilotakController.list);

// Új pilóta felvétele (GET)
router.get('/uj', pilotakController.newForm);

// Új pilóta felvétele (POST)
router.post('/uj', pilotakController.create);

// Szerkesztés (GET)
router.get('/szerkesztes/:id', pilotakController.editForm);

// Szerkesztés (POST)
router.post('/szerkesztes/:id', pilotakController.update);

// Törlés
router.get('/torles/:id', pilotakController.delete);

module.exports = router;
