const moment = require('moment');

/* Para que check interprete como un error hay que mandar un valor false */

const esFecha = (value) => {
  if (!value) {
    return false;
  }
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  }
  return false;
};

module.exports = { esFecha };
