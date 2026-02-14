const Funciones_Model = require('../models/funciones_models');
let result;

class FuncionesController {
  mostrar_funciones() {
    result = Funciones_Model.mostrar_funciones();
    return result;
  }
  mostrar_funciones_recientes() {
    result = Funciones_Model.mostrar_funciones_recientes();
    return result;
  }
  ingresar_funcion(funcion) {
    result = Funciones_Model.ingresar_funcion(funcion);
    return result;
  }
}

module.exports = new FuncionesController();