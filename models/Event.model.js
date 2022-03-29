const { Schema, model } = require('mongoose');

/** Una propiedad del evento es el usuario que lo creó, este usuario
 * forma parte nuestro back, asi que lo ponemos como una referencia al
 * esquema de usuario que hemos creado. con las propiedades type y ref
 * que son necesarias para realizar esta referencia
 */

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

module.exports = model('Evento', EventoSchema);
