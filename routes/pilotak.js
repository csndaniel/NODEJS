const express = require('express');
const router = express.Router();
const pilotakController = require('../controllers/pilotakController');
const { adminCheck } = require('../middleware/auth');

// ADMIN jogosultság a teljes CRUD-ra
router.use(adminCheck);

// Lista
router.get('/', pilotakController.list);

// Új felvétele
router.get('/uj', pilotakController.newForm);
router.post('/uj', pilotakController.create);

// Szerkesztés
router.get('/szerkesztes/:id', pilotakController.editForm);
router.post('/szerkesztes/:id', pilotakController.update);

// Törlés
router.get('/torles/:id', pilotakController.delete);

module.exports = router;
