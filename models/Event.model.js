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

/* Mongoose tiene un serializador por defecto yo puedo sobreescribir ese metodo
para que lo haga como yo quiero */

EventoSchema.method('toJSON', function () {
  // Referencia al objeto , saco las propiedades que me interesan por desectructuracion
  const { __v, _id, ...object } = this.toObject();
  // ahora reemplazo las propiedades.
  object.id = _id;
  return object;
});

module.exports = model('Evento', EventoSchema);
