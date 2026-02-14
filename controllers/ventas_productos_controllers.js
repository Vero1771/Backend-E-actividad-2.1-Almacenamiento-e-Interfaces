const Ventas_Productos_Model = require('../models/ventas_productos_models');
let result;

class VentasProductosController {
  mostrar_productos_vendidos() {
    result = Ventas_Productos_Model.mostrar_productos_vendidos();
    return result;
  }
  ingresar_producto_vendido(producto) {
    result = Ventas_Productos_Model.ingresar_producto_vendido(producto);
    return result;
  }
}

module.exports = new VentasProductosController();