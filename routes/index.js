const express = require('express');
const router = express.Router();

// Főoldal – később itt lesz a cég bemutatása
router.get('/', (req, res) => {
  res.render('index', { title: 'Főoldal' });
});

module.exports = router;
