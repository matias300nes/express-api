const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las tareas
router.get('/', (req, res) => {
  const query = `SELECT * FROM tareas`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ tasks: rows });
  });
});

// Crear una tarea
router.post('/', (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  const query = `INSERT INTO tareas (nombre, descripcion, estado) VALUES (?, ?, ?)`;

  db.run(query, [nombre, descripcion, estado], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, nombre, descripcion, estado });
  });
});

// Actualizar una tarea
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;
  const query = `UPDATE tareas SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?`;

  db.run(query, [nombre, descripcion, estado, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea actualizada', id });
  });
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tareas WHERE id = ?`;

  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  });
});

module.exports = router;
