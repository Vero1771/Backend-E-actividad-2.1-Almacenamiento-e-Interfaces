const ventas_productos = require('../db/ventas_productos');

class VentasProductosModel {
  _validarDatos(producto) {
    const errors = [];
    const camposObligatorios = ['id_producto', 'id_venta', 'cantidad', 'subtotal'];
    for (const campo of camposObligatorios) {
      if (producto[campo] === undefined || producto[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (isNaN(producto.id_producto) || producto.id_producto < 0  || isNaN(producto.id_venta) || producto.id_venta < 0 ) {
      errors.push("El id de la venta, el id del producto deben ser números válidos");
    }

    if (isNaN(producto.cantidad) || producto.cantidad < 0 || isNaN(producto.subtotal) || producto.subtotal < 0) {
      errors.push("El subtotal y la cantidad deben ser un números válidos y no puede ser negativos");
    }

    return errors;
  }
  mostrar_productos_vendidos() {
    if (ventas_productos.length > 0) {
      return {
        code: 200,
        message: "consulta completada con éxito",
        result: ventas_productos
      };
    } else {
      return {
        code: 404,
        message: "no hay ventas de productos registradas",
        result: []
      };
    }
  }
  ingresar_producto_vendido(producto) {
    const error = this._validarDatos(producto);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }
    let new_id;
    if (ventas_productos.length > 0) {
      new_id = ventas_productos[ventas_productos.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    ventas_productos.push({
      id: new_id,
      id_producto: Number(producto.id_producto),
      id_venta: Number(producto.id_venta),
      cantidad: Number(producto.cantidad),
      subtotal: Number(producto.subtotal)
    });
    return {
      code: 200,
      message: "venta del producto agregada con éxito",
      result: ventas_productos
    };
  }
}

module.exports = new VentasProductosModel();