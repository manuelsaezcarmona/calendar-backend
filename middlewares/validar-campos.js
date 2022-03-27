const { response } = require('express');
/** Esto es un Custom Middleware cuya funcion es unicamente la de  incorporarse
 * entre el endpoint y el metodo que se ejecuta.
 * Este lo voy a crear para evitar codigo redundante en los controllers.
 * Los middlewares admiten un tercer parametro que es next. Es como una
 * instruccion que "pasa el testigo" a la siguiente "linea function"
 */

/** El check de express-validator va a colocar en la request los errores
 * de validacion le hemos definido como un objeto Result. donde los errores
 * se recogen en un array de errors. Si no hay errores errores = []
 */

const { validationResult } = require('express-validator');

const validarcampos = (req, res = response, next) => {
  /* En el caso que salte algun error retornara el status y si todo
  ha ido bien pasara al siguiente  instruccion que en este caso seria crearusuaio o login */
  // Manejo de errores.
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = { validarcampos };
