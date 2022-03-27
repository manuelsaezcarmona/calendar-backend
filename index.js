// Vamos a usar para el backEnd la importacion clasica con require.
// Si quieres hacerlo con molulos import / export . Puedes hacerlo poniendo
// en el package.json la siguiente linea: "type": "module",

const express = require('express');
require('dotenv').config();

// console.log(process.env);

// Crear servidor express

const app = express();

// Directorio Publico

app.use(express.static('public'));

// Rutas
/* app.get('/', (req, res) => {
  res.json({ ok: true });
}); */

// Puesta en marcha . escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor en marcha corriendo en puerto ${process.env.PORT}`);
});
