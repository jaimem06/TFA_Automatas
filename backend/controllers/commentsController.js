const Comment = require('../models/Comment');
const Pattern = require('../models/Pattern');

// Analizar comentarios
exports.analyzeComments = async (req, res) => {
  try {
    const { comments } = req.body;

    // Obtener patrones ofensivos
    const patterns = await Pattern.find();
    const offensiveWords = patterns.map((pattern) => pattern.word);

    // Analizar cada comentario
    const analyzedComments = comments.map((comment) => {
      const isOffensive = offensiveWords.some((word) =>
        comment.toLowerCase().includes(word.toLowerCase())
      );
      return { content: comment, isOffensive };
    });

    // Guardar en la base de datos
    await Comment.insertMany(analyzedComments);

    res.status(200).json({ analyzedComments });
  } catch (error) {
    res.status(500).json({ error: 'Error al analizar comentarios' });
  }
};
