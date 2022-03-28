/* eslint-disable no-unreachable */
const { response } = require('express');
const jwt = require('jsonwebtoken');

/** Como voy a recibir el JWT? De donde? Depende de como quieras que trabaje tu API
 *  Lo suyo es mandarlos en los Headers. Las cabeceras de las peticiones y no en el body
 * el cuerpo de las peticiones
 * En las cabeceras suele ser un estandar que tengan como prefijo x-
 * asi que al nombre del campo (key) le voy a llamar x-token
 */

const validarJWT = (req, res = response, next) => {
  // Leer el header con el key x-token (que asi lo defino yo)
  const token = req.header('x-token');

  // Validacion si no existe el token pues ya esta!!!
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion',
    });
  }

  try {
    /* Validar el jwt,la libreria ya viene con metodos para realizar esa tarea.
       La manera de leer el token debe de ser igual a la manera como se genero.
       para extraer el payload tiene el metodo verify que necesita el token y el secret key
      para que sea desencriptado */
    //  const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // console.log(payload); // Aqui veras en un objeto toda la informacion. Lo puedo desectructurar
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    /* tambien puedo incorporar esta informacion a la request para que desde aqui se lance directamente
      las peticiones http que estan esperando la informacion de las request */

    req.uid = uid;
    req.name = name;
  } catch (error) {
    // Este carch solo se va a disparar si el token no es valido

    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }
  next();
};

module.exports = {
  validarJWT,
};
