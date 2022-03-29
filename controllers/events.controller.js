const { response } = require('express');

const getEventos = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Obtener Eventos',
  });
};

const crearEvento = (req, res = response) => {
  // Verificar que tengo los datos del evento
  console.log(req.body);

  res.status(200).json({
    ok: true,
    msg: 'evento creado',
  });
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
