require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configuración inicial
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

// Rutas
app.use('/api/comments', require('./routes/comments'));
app.use('/api/patterns', require('./routes/patterns'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));


// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
