const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ email, name: user.name }, 'secreto_super_seguro', { expiresIn: '1h' });
    return res.json({ token, name: user.name });
  }

  res.status(401).json({ error: 'Credenciales inválidas' });
});

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
