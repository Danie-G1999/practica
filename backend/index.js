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

// Ruta para consultar los servicios
app.get('/api/services', async (req, res) => {
  try {
    // Consultar todos los servicios en la tabla "services"
    const services = await knex('services').select('*').orderBy('id', 'asc');;

    if (services.length === 0) {
      return res.status(200).json({ error: 'No se encontraron servicios' });
    }

    res.json({ services });
  } catch (error) {
    console.error('Error en /api/services:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo servicio
app.post('/api/createService', async (req, res) => {
  const { name, descripcion, price, status } = req.body;
  // Validar que todos los campos estén presentes
  if (!name || !descripcion || price === undefined || status === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Insertar el nuevo servicio en la base de datos
    const [newService] = await knex('services').insert({
      name,
      descripcion,
      price,  // Almacenamos el precio como decimal
      status// Almacenamos el estado como 1 o 0
    }).returning('*'); // Retornamos el servicio insertado para confirmación

    res.status(200).json({ service: newService, status: 200 }); // Devolver el servicio creado
  } catch (error) {
    res.status(500).json({ error: error, status: 500 });
  }
});


// Edicion de servicio
app.put('/api/EditServices/:id', async (req, res) => {

  const { id } = req.params;
  const { name, descripcion, price, status } = req.body;

  try {
    // Realizar la actualización con Knex
    const [updatedService] = await knex('services')
      .where({ id })
      .update({
        name,
        descripcion,
        price,
        status
      })
      .returning('*');

    res.status(200).json({ service: updatedService, status: 200 }); // Respondemos con el servicio actualizado
  } catch (error) {
    res.status(500).json({ error: error, status: 500 });
  }
});

// Método para alternar el estado de un servicio
app.put('/api/services/:id/deactivate', async (req, res) => {
  const { id } = req.params; // Obtenemos el id de la URL

  try {
    // Primero, obtenemos el servicio actual para saber su estado
    const service = await knex('services').where({ id }).first();

    // Si el servicio no se encuentra, respondemos con un error 404
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado', status: 404 });
    }

    // Alternamos el estado: si el servicio está activo (status: true), lo desactivamos (status: false)
    // Si está desactivado (status: false), lo activamos (status: true)
    const newStatus = service.status ? false : true;

    // Actualizamos el servicio con el nuevo estado
    const updatedService = await knex('services')
      .where({ id })
      .update({ status: newStatus })
      .returning('*'); // Devolvemos el servicio actualizado

    // Respondemos con el servicio actualizado
    res.status(200).json({ service: updatedService[0], status: 200 });
  } catch (error) {
    console.error('Error al alternar el estado del servicio:', error);
    res.status(500).json({ error: 'Hubo un error al alternar el estado del servicio', status: 500 });
  }
});


// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
