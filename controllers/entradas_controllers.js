const Entradas_Model = require('../models/entradas_models');
let result;

class EntradasController {
  mostrar_entradas() {
    result = Entradas_Model.mostrar_entradas();
    return result;
  }
  ingresar_entrada(entrada) {
    result = Entradas_Model.ingresar_entrada(entrada);
    return result;
  }
}

module.exports = new EntradasController();