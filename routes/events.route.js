/** Event routes
 * /api/events
 * */

const { Router } = require('express');
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas las routas pasan por el middleware validar JWT definamoloas de manera global.
router.use(validarJWT);

// Obtener Eventos
router.get('/', getEventos);

// Crear Evento
router.post('/', crearEvento);

// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);

// Exportacion por defecto
module.exports = router;

/** Dado que tenemos que validar el token en todas las routas podemos
 * pasar el midlleware de manera global , ANTES de que lleguen a las
 * rutas .
 * Tambien lo puedes poner como midlleware en cada ruta:
 * // Obtener Eventos
router.get('/', validarJWT, getEventos);

// Crear Evento
router.post('/', validarJWT, crearEvento);

// Actualizar Evento
router.put('/:id', validarJWT, actualizarEvento);

// Borrar Evento
router.delete('/:id', validarJWT, eliminarEvento);
 *
 */
