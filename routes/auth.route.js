/**
 * Rutas de usuarios / Auth
 *  host + /api/auth
 */

const express = require('express');

const router = express.Router();
/** Se se va a encargar de validar un campo en particular */
const { check } = require('express-validator');

const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require('../controllers/auth.controller');

const { validarcampos } = require('../middlewares/validar-campos');

/* vamos a usar el middleware que me proporciona express validator
para aplicar un solo midlleware se le pasaria como segundo parametro
al metodo (post, get...) pero si son necesarios varios se le pasa en
un array de middleware */
router.post(
  '/new',
  [
    // middlewares
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarcampos,
  ],

  crearUsuario
);

router.post(
  '/login',

  [
    // middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarcampos,
  ],

  loginUsuario
);

router.get('/renew', revalidarToken);
module.exports = router;
