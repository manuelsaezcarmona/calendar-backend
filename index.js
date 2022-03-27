// Vamos a usar para el backEnd la importacion clasica con require.
// Si quieres hacerlo con molulos import / export . Puedes hacerlo poniendo
// en el package.json la siguiente linea: "type": "module",

const express = require('express');

// Crear servidor express

const app = express();

// Rutas
app.get('/', (req, res) => {
  res.json({ ok: true });
});

// Puesta en marcha . escuchar peticiones
app.listen(4000, () => {
  console.log(`Servidor en marcha corriendo en puerto ${4000}`);
});
