const pool = require('../db/connection_db');

class VentasProductosModel {
  static _validarDatos(producto) {
    const errors = [];
    const camposObligatorios = ['id_producto', 'id_venta', 'cantidad'];
    for (const campo of camposObligatorios) {
      if (producto[campo] === undefined || producto[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (isNaN(producto.id_producto) || producto.id_producto < 0 || isNaN(producto.id_venta) || producto.id_venta < 0) {
      errors.push("El id de la venta, el id del producto deben ser números válidos");
    }

    if (isNaN(producto.cantidad) || producto.cantidad < 0) {
      errors.push("La cantidad debe ser un número válido y no puede ser negativa");
    }

    return errors;
  }
  static mostrar_productos_vendidos() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT ventas_productos.id_venta_producto, productos.id_producto, productos.nombre AS "producto", productos.precio_unitario, ventas_productos.cantidad, ventas.id_venta, metodos_pago.nombre AS "metodo_pago", ventas.fecha FROM `ventas_productos` JOIN `productos` ON productos.id_producto = ventas_productos.id_producto JOIN `ventas` ON ventas.id_venta = ventas_productos.id_venta JOIN `metodos_pago` ON metodos_pago.id_metodo = ventas.id_metodo ORDER BY ventas_productos.id_venta_producto;')
        .then(([rows]) => {
          resolve({ code: 200, message: "consulta completada con éxito", result: rows })
        })
        .catch(err =>
          reject({ code: 500, message: err.message, result: [err] })
        );
    });
  }
  static mostrar_productos_vendidos_por_id(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT ventas_productos.id_venta_producto, productos.id_producto, productos.nombre AS "producto", productos.precio_unitario, ventas_productos.cantidad, ventas.id_venta, metodos_pago.nombre AS "metodo_pago", ventas.fecha FROM `ventas_productos` JOIN `productos` ON productos.id_producto = ventas_productos.id_producto JOIN `ventas` ON ventas.id_venta = ventas_productos.id_venta JOIN `metodos_pago` ON metodos_pago.id_metodo = ventas.id_metodo WHERE id_venta_producto = ?', id)
        .then(([rows]) => {
          if (rows.length > 0) {
            resolve({ code: 200, message: "consulta completada con éxito", result: rows })
          }
          resolve({ code: 404, message: "no hay ventas registradas con ese ID", result: rows })
        })
        .catch(err =>
          reject({ code: 500, message: err.message, result: [err] })
        );
    });
  }
  static ingresar_producto_vendido(producto) {
    return new Promise((resolve, reject) => {
      const error = VentasProductosModel._validarDatos(producto);
      if (error.length > 0) {
        reject({ code: 400, message: "Ha ocurrido un problema al ingresar los datos", result: error })
        return;
      }
      pool.query('INSERT INTO `ventas_productos` SET ?', producto)
        .then(([rows]) => {
          resolve({ code: 200, message: "consulta completada con éxito", result: [rows] })
        })
        .catch(err =>
          reject({ code: 500, message: err.message, result: [err] })
        );
    });
  }
}

module.exports = VentasProductosModel;