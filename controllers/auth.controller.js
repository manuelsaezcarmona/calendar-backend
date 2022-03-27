/* eslint-disable max-len */
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
const Usuario = require('../models/Usuario.model');

const crearUsuario = async (req, res = response) => {
  // Voy a desectructurar las propiedades que me interesan del body
  const { email, password } = req.body;
  try {
    /* Validaciones en la base de datos: Si definimos en el esquema propiedades unicas el motor
    *  de Mongoose nos dara error y no permitira grabar en nuestra base de datos.
       Debemos de ser nosotros los que tengamos controlados esos errores  el metodo find one
       nos devuelve un registro con las condiciones pasadas como objeto JS si no lo encuentra nos devuelve un null */
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese correo',
      });
    }
    // creamos una instancia del  Modelo (clase) Usuario
    usuario = new Usuario(req.body);
    // Ahora lo grabo en la base de datos. el metodo  es save que regresa una promesa
    await usuario.save();

    return res.status(201).json({
      ok: true,
      msg: 'usuario creado',
      uid: usuario.id,
      username: usuario.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
    });
  }
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;

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
