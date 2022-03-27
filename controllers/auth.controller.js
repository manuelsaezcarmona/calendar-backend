/* eslint-disable no-unused-vars */
// Aunque este import no es necesario para que VSCode recoga la ayuda lo hago.
// y pongo como parametro por defecto el express response.
/* const express = require('express');
const crearUsuario = (req, res = express.response) => {
  res.json({ ok: true, msg: 'created' });
}; */

// aunque como queda un poco feo puedo desectructurar express y quedarme solo con las
// response, (y la request tambien )
const { response } = require('express');

const crearUsuario = (req, res = response) => {
  // Voy a desectructurar las propiedades que me interesan del body
  const { username, email, password } = req.body;

  if (username.length < 5) {
    return res.json({
      ok: false,
      msg: 'El nombre tiene que tener al menos 5 letras',
    });
  }

  res.json({
    ok: true,
    msg: 'created',
    username,
    email,
    password,
  });
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;
  res.json({
    ok: true,
    msg: 'login',
    email,
    password,
  });
};

const revalidarToken = (req, res = response) => {
  res.json({ ok: true, msg: 'renew' });
};

// En module exports si es defecto se coloca el nombre de la funcion,
// pero si se trata de un export normal, lo englobamos en un objeto que
// es el que exportamos
module.exports = {
  crearUsuario,
  revalidarToken,
  loginUsuario,
};
