/** Event routes
 * /api/events
 * */

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events.controller');

/* Recuerda que el check no detiene la ejecucion, no son errores, solo informacion
en un objeto , las condiciones que no se cumplan en el check, para eso hicimos el
middleware validar campos en el que devuelve el error como repuesta */
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esFecha } = require('../helpers/esFecha');

const router = Router();

// Todas las routas pasan por el middleware validar JWT definamoloas de manera global.
router.use(validarJWT);

// Obtener Eventos
router.get('/', getEventos);

// Crear Evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(esFecha),
    check('end', 'La fecha de finalizacion es obligatoria').custom(esFecha),
    validarcampos, // Este es el que si no pasa devuelve una respuesta
  ],

  crearEvento
);

// Actualizar Evento
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(esFecha),
    check('end', 'La fecha de finalizacion es obligatoria').custom(esFecha),
    validarcampos, // Este es el que si no pasa devuelve una respuesta
  ],
  actualizarEvento
);

// Borrar Evento
router.delete('/:id', eliminarEvento);

// Exportacion por defecto
module.exports = router;

// metodo check is date. La fecha debe de mandarse de este formato :2022-04-01.
// Nos podemos crear un custom validator esFecha()
// check('start', 'La fecha de inicio es obligatoria').isDate(), // Nativo

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
