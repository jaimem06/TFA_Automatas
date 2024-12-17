const express = require('express');
const router = express.Router();

// Ruta básica para patrones ofensivos
router.get('/', (req, res) => {
  res.json({ message: 'Endpoint de patrones ofensivos en desarrollo' });
});

module.exports = router;
