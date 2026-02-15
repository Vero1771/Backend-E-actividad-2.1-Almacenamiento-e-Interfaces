const Ventas_Productos_Model = require('../models/ventas_productos_models');

class VentasProductosController {
  static mostrar_productos_vendidos() {
    return Ventas_Productos_Model.mostrar_productos_vendidos().then(r => r).catch(err => err);
  }
  static mostrar_productos_vendidos_por_id(id) {
    return Ventas_Productos_Model.mostrar_productos_vendidos_por_id(id).then(r => r).catch(err => err);
  }
  static ingresar_producto_vendido(producto) {
    return Ventas_Productos_Model.ingresar_producto_vendido(producto).then(r => r).catch(err => err);
  }
}

module.exports = VentasProductosController;