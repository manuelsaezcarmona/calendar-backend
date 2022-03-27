/**
 * Rutas de usuarios / Auth
 *  host + /api/auth
 */

const express = require('express');

const router = express.Router();

const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require('../controllers/auth.controller');

router.post('/new', crearUsuario);

router.post('/login', loginUsuario);

router.get('/renew', revalidarToken);
module.exports = router;
