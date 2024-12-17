const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { link } = req.body;

  // Simulación de análisis de comentarios
  const comments = [
    { text: 'Este es un comentario normal.', offensive: false },
    { text: 'Eres un idiota!', offensive: true },
    { text: 'Buen trabajo equipo.', offensive: false },
    { text: 'Qué basura de publicación!', offensive: true },
  ];

  res.json(comments);
});

module.exports = router;
