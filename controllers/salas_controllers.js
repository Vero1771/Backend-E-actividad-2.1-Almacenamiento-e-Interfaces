const Salas_Model = require('../models/salas_models');
let result;

class SalasController {
  mostrar_salas() {
    result = Salas_Model.mostrar_salas();
    return result;
  }
  ingresar_sala(sala) {
    result = Salas_Model.ingresar_sala(sala);
    return result;
  }
}

module.exports = new SalasController();