const express = require('express');
const app = express();
const port = 5000;

// Routers
const tareasRouter = require('./routes/tareas');

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/tareas', tareasRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API de tareas con Express y SQLite');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});