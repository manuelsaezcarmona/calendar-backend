const { response } = require('express');
const Evento = require('../models/Event.model');

const getEventos = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Obtener Eventos',
  });
};

const crearEvento = async (req, res = response) => {
  // Verificar que tengo los datos del evento
  console.log(req.body);
  const evento = new Evento(req.body);
  try {
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

const actualizarEvento = (req, res = response) => {
  res.status(200).json({
    id: req.id,
    ok: true,
    msg: 'evento actualizado',
  });
};

const eliminarEvento = (req, res = response) => {
  res.status(200).json({
    id: req.id,
    ok: true,
    msg: 'evento eliminado',
  });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
