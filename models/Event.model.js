const { Schema, model } = require('mongoose');

/** Una propiedad del evento es el usuario que lo creó, este usuario
 * forma parte nuestro back, asi que lo ponemos como una referencia al
 * esquema de usuario que hemos creado. con las propiedades type y ref
 * que son necesarias para realizar esta referencia
 */

const EventoSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

module.exports = model('Evento', EventoSchema);
