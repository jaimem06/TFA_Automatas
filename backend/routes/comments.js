const express = require('express');
const router = express.Router();
const { analyzeComments } = require('../controllers/commentsController');

// Ruta para analizar comentarios
router.post('/analyze', analyzeComments);

module.exports = router;
