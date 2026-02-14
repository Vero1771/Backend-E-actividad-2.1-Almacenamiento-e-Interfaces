const Productos_Model = require('../models/productos_models');
let result;

class ProductosController {
  mostrar_productos() {
    result = Productos_Model.mostrar_productos();
    return result;
  }
  mostrar_productos_por_id(id) {
    result = Productos_Model.mostrar_productos_por_id(id);
    return result;
  }
  ingresar_producto(producto) {
    result = Productos_Model.ingresar_producto(producto);
    return result;
  }
  editar_producto(id, actualizar) {
    result = Productos_Model.editar_producto(id, actualizar);
    return result;
  }
  eliminar_producto(id) {
    result = Productos_Model.eliminar_producto(id);
    return result;
  }
}

module.exports = new ProductosController();