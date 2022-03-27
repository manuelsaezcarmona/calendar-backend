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

/** Las contraseñas no deben de ir en texto plano, porque viajan y pueden ser interceptadas
 * La primera medida de seguridad es encriptar la contraseña. tenemos una libreria que nos
 * ayuda con eso
 */
const bcrypt = require('bcryptjs');
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
    // Encriptar la contraseña.
    // 1 - Generar un pedazo de informacion aleatoria que se le suele llamar salt.  Cuando mas vueltas mas seguro es pero consume mas recursos y mas dificil de testar.
    //     Se suele dar un numero de saltos equilibrado 10 por defecto.
    const salt = bcrypt.genSaltSync();
    // Ahora vamos a sustituir el password que nos ha llegado del body por la contraseña encriptada
    usuario.password = bcrypt.hashSync(password, salt);

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

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Confirmar que exista un usuario con ese email.
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      });
    }

    // Confirmar los passwords
    // bcrypt nos da un metodo que nos permite comparar la contraseña que introduce el usuario (desencriptada) con la almacenada en la DB (encripptada)
    // Devuelve true si es valido y false si no es valido.
    const validPassword = bcrypt.compareSync(password, usuario.password);
    // Si no es valido devolvemos un error como respuesta.
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password Incorrecto',
      });
    }
    // Si ha pasado la validacion de la contraseña . podemos generar nuestro JSON Web Token - JWT

    // Mandamos la respuesta correcta.
    return res.json({
      ok: true,
      uid: usuario.id,
      username: usuario.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor contacte con el administrador',
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
