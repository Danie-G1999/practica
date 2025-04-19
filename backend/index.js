const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde frontend/dist
app.use(express.static(path.join(__dirname, './frontend/dist')));

// Redirigir todas las rutas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
});

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

// Cargaremos los testimonios
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonies = await knex('testimonies').select('*');
    res.status(200).json({ status: 200, testimonies });
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    res.status(500).json({ status: 500, error: 'Error interno del servidor' });
  }
});

// Cargaremos los testimonios activos
app.get('/api/testimonialsActive', async (req, res) => {
  try {
    const testimonies = await knex('testimonies').select('*').where({ status: true });
    res.status(200).json({ status: 200, testimonies });
  } catch (error) {
    console.error('Error al obtener testimonios:', error);
    res.status(500).json({ status: 500, error: 'Error interno del servidor' });
  }
});

// endpoint para guardar testimonios
app.post('/api/testimonials', async (req, res) => {
  const { name, descripcion, date, calification, image } = req.body;

  // Validación
  if (!name || !descripcion || !date || !calification || !image) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const [newTestimonial] = await knex('testimonies')
      .insert({
        name,
        descripcion,
        image,
        date,
        calification // <- corregí el nombre según tu base
      })
      .returning('*');

    res.status(200).json({ testimonial: newTestimonial, status: 200 });
  } catch (error) {
    console.error('Error al guardar el testimonio:', error);
    res.status(500).json({ error: 'Error interno del servidor', status: 500 });
  }
});


// Editaremos el testimonio
app.put('/api/testimonials/:id', async (req, res) => {
  const { id } = req.params;
  const { name, descripcion, image, date, calification } = req.body;

  // Validar campos necesarios
  if (!name || !descripcion || !date || !calification) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const [updatedTestimonial] = await knex('testimonies')
      .where({ id })
      .update({
        name,
        descripcion,
        image,         // Asegúrate de que esté en base64 o como lo manejes
        date,
        calification
      })
      .returning('*');

    res.status(200).json({ testimonial: updatedTestimonial, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500 });
  }
});


// Método para alternar el estado de un testimonio
app.put('/api/testimonials/:id/deactivate', async (req, res) => {
  const { id } = req.params; // Obtenemos el id de la URL

  try {
    // Primero, obtenemos el testimonio actual para saber su estado
    const testimonial = await knex('testimonies').where({ id }).first();

    // Si el testimonio no se encuentra, respondemos con un error 404
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonio no encontrado', status: 404 });
    }

    // Alternamos el estado: si el testimonio está activo (status: true), lo desactivamos (status: false)
    // Si está desactivado (status: false), lo activamos (status: true)
    const newStatus = testimonial.status ? false : true;

    // Actualizamos el testimonio con el nuevo estado
    const updatedTestimonial = await knex('testimonies')
      .where({ id })
      .update({ status: newStatus })
      .returning('*'); // Devolvemos el testimonio actualizado

    // Respondemos con el testimonio actualizado
    res.status(200).json({ testimonial: updatedTestimonial[0], status: 200 });
  } catch (error) {
    console.error('Error al alternar el estado del testimonio:', error);
    res.status(500).json({ error: 'Hubo un error al alternar el estado del testimonio', status: 500 });
  }
});


// Ruta para guardar contacto
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validación de campos
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ status: 400, error: 'Todos los campos son obligatorios' });
  }

  try {
    await knex('contacts').insert({ name, email, phone, message });

    // Solo enviamos mensaje de éxito
    res.status(200).json({ status: 200, message: 'Contacto guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el contacto:', error);
    res.status(500).json({ status: 500, error: 'Error al guardar el contacto' });
  }
});


// Ruta para cargar los contactos
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await knex('contacts').select('*').orderBy('status', 'desc');;
    res.status(200).json({ status: 200, contacts });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ status: 500, error: 'Error interno del servidor' });
  }
});


// Endpoint para alternar el estado de un contacto
app.put('/api/contacts/:id/deactivate', async (req, res) => {
  const { id } = req.params; // Obtenemos el id del contacto desde la URL

  try {
    // Buscar el contacto actual
    const contact = await knex('contacts').where({ id }).first();

    if (!contact) {
      return res.status(404).json({ error: 'Contacto no encontrado', status: 404 });
    }

    // Alternar estado
    const newStatus = contact.status ? false : true;

    // Actualizar estado
    const updatedContact = await knex('contacts')
      .where({ id })
      .update({ status: newStatus })
      .returning('*'); // Devuelve el contacto actualizado

    res.status(200).json({ contact: updatedContact[0], status: 200 });
  } catch (error) {
    console.error('Error al alternar el estado del contacto:', error);
    res.status(500).json({ error: 'Hubo un error al alternar el estado del contacto', status: 500 });
  }
});


// Iniciar el servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
