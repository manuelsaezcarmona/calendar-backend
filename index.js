/* eslint-disable max-len */
// Vamos a usar para el backEnd la importacion clasica con require.
// Si quieres hacerlo con molulos import / export . Puedes hacerlo poniendo
// en el package.json la siguiente linea: "type": "module",

const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database/db.config');

// console.log(process.env);

// Crear servidor express

const app = express();

// Base de datos
dbConnection();

/* --- MIDDLEWARES ---- */
// CORS - Capa de Seguridad para nuestras peticiones (mirar documentacion)
app.use(cors());
// Informacion de peticiones Directamente en Server
app.use(morgan('dev'));
// Directorio Publico
app.use(express.static('public'));

// LEctura y parseo del body
app.use(express.json());

/* --- RUTAS ---- */
// este comando lo que quiere decir es que todo lo que se va a importar en este archivo lo va a habilitar en esta ruta
app.use('/api/auth', require('./routes/auth.route'));

// TODO: Auth // crear usuarios, login,  renew con token.
// TODO: CRUD -> Eventos

/* --- PUESTA EN MARCHA ---- */
app.listen(process.env.PORT, () => {
  console.log(`Servidor en marcha corriendo en puerto ${process.env.PORT}`);
});
