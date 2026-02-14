const Ventas_Model = require('../models/ventas_models');
let result;

class VentasController {
  mostrar_ventas_por_rango(rango) {
    result = Ventas_Model.mostrar_ventas_por_rango(rango);
    return result;
  }
  ingresar_venta(venta) {
    result = Ventas_Model.ingresar_venta(venta);
    return result;
  }
}

module.exports = new VentasController();