/* eslint-disable arrow-body-style */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable comma-dangle */
const jwt = require('jsonwebtoken');

/** Esta funcion necesita recibir el payload de mi token  */
// Retornar una promesa para que sea asincrona ya que jwt no devuelve promesas
const generarJWT = (uid, name) => {
  // Ahora vamos a generar el token , eso se hace con el metodo sign. EL primer argumento
  // es el payload y el segundo es el SECRET o privatekey que es una palabra que ayude al backend
  // a saber si el token lo he generado yo o no.
  // El tercer parametro son las opciones que le podemos dar a este webtoken.
  // Por ultimo un callback que se va a disparar con un error en caso que no se pudiera firmar
  // y el payload enviado.

  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
