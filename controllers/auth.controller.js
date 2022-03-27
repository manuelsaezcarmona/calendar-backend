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
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {
  // Voy a desectructurar las propiedades que me interesan del body
  const { username, email, password } = req.body;

  /** El check de express-validator va a colocar en la request los errores
   * de validacion le hemos definido como un objeto Result. donde los errores
   * se recogen en un array de errors. Si no hay errores errores = []
   */

  // Manejo de errores.
  const errors = validationResult(req);
  // console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  return res.status(201).json({
    ok: true,
    msg: 'created',
    username,
    email,
    password,
  });
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;

  // Manejo de errores.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  return res.status(201).json({
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
