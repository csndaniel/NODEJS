const express = require('express');
const router = express.Router();
const pilotakController = require('../controllers/pilotakController');
const { adminCheck } = require('../middleware/auth'); // ← Ha nincs ilyen fájl, megírom

// MINDEN CRUD művelethez admin jogosultság kell
router.use(adminCheck);

// Lista
router.get('/', pilotakController.list);

// Új felvétele
router.get('/uj', pilotakController.newForm);
router.post('/uj', pilotakController.create);

// Szerkesztés
router.get('/szerkesztes/:id', pilotakController.editForm);
router.post('/szerkesztes/:id', pilotakController.update);

// Törlés – ajánlott DELETE metódussal
router.delete('/torles/:id', pilotakController.delete);

module.exports = router;
