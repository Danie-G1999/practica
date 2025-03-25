const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);

const app = express();
app.use(express.json());
app.use(cors());

// Definir un usuario de prueba
const user = {
  email: 'usuario@example.com',
  password: '123456',
  name: 'Juan Pérez',
};

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await knex('users').where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, name: user.name }, 'secreto_super_seguro', {
      expiresIn: '1h',
    });

    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Error en /api/login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
