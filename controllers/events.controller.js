const { response } = require('express');
const Evento = require('../models/Event.model');

const getEventos = async (req, res = response) => {
  /* Si quiero mandar como respuesta la informacion relacionada
  del usuario como el nomnbre existe el metodo populate para hacer uso de
  la referencia que hemos especificado en el modelo */
  const eventos = await Evento.find().populate('user', 'username');

  res.status(200).json({
    ok: true,
    msg: 'Obtener Eventos',
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  // Verificar que tengo los datos del evento
  // console.log(req.body);
  const evento = new Evento(req.body);

  try {
    // Necesito el id del usuario eso viene en la request
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.status(200).json({
      ok: true,
      msg: 'evento creado',
      eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el evento',
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  // viene por parametros
  const eventId = req.params.id;
  const { uid } = req;

  try {
    // Verificar que este evento exista.

    const evento = await Evento.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe Evento con ese ID',
      });
    }
    // Verificar si la persona que creo el evento es la misma que lo quiere actualizar
    // ese evento user esta como ObjectID , lo convertimos a String
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permiso para editar este evento',
      });
    }

    // Pasadas las validaciones comencemos a actualizar el evento .
    // El evento ya lo tengo con el findById
    const eventoAactualizar = {
      ...req.body,
      user: uid,
    };

    /* findByIdAndUpdate por defecto devuelve el viejo documento por si aun
     quisieran hacer algo con él pero puede ser confuso que en la respuesta
     se muestre el evento "antiguo" (sin actualizar) .
     findByIdAndUpdate tiene un tercer argumamentos que son las opciones entre ellas
     que me devuelva el evento totalmente actualizado */

    const eventoactualizado = await Evento.findByIdAndUpdate(
      eventId,
      eventoAactualizar,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: 'evento actualizado',
      evento: eventoactualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el evento',
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    // Veificar que el elemento exista
    const evento = await Evento.findById(eventId);

    // SI no existe el evento
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe Evento con ese ID',
      });
    }

    // Si el usuario no es el mismo que lo creo
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permiso para editar este evento',
      });
    }
    // Pasadas las validaciones procedo al borrado
    const eventoBorrado = await Evento.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
      msg: 'Evento eliminado',
      title: eventoBorrado.title,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al borrar el evento',
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
