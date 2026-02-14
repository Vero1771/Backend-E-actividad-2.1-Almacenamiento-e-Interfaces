const productos = require('../db/productos');
const ventas_productos = require('../db/ventas_productos');

class ProductosModel {
  _validarDatos(producto) {
    const errors = [];
    const camposObligatorios = ['nombre', 'cantidad', 'precio_unitario'];
    for (const campo of camposObligatorios) {
      if (producto[campo] === undefined || producto[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (typeof(producto.nombre) !== "string") {
      errors.push("El nombre del producto debe ser una cadena de texto");
    }

    if (isNaN(producto.precio_unitario) || producto.precio_unitario < 0 || isNaN(producto.cantidad) || producto.cantidad < 0) {
      errors.push("El precio y la cantidad deben ser números válidos");
    }

    return errors;
  }
  mostrar_productos() {
    if (productos.length > 0) {
      return {
        code: 200,
        message: "consulta completada con éxito",
        result: productos
      };
    } else {
      return {
        code: 404,
        message: "no hay productos registrados",
        result: []
      };
    }
  }
  mostrar_productos_por_id(id) {
    if (productos.length > 0) {
      const index = productos.findIndex(p => p.id === Number(id));
      if (index !== -1) {
        return {
          code: 200,
          message: "consulta completada con éxito",
          result: productos[index]
        };
      } else {
        return {
          code: 404,
          message: "no hay productos registrados con ese ID",
          result: []
        };
      }
    } else {
      return {
        code: 404,
        message: "no hay productos registrados",
        result: []
      };
    }
  }
  ingresar_producto(producto) {
    const error = this._validarDatos(producto);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }

    let new_id;
    if (productos.length > 0) {
      new_id = productos[productos.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    productos.push({
      id: new_id,
      nombre: producto.nombre,
      cantidad: Number(producto.cantidad),
      precio_unitario: Number(producto.precio_unitario)
    });
    return {
      code: 200,
      message: "producto agregado con éxito",
      result: productos
    };
  }
  editar_producto(id, actualizar) {
    if (productos.length > 0) {

      const error = this._validarDatos(actualizar);
      if (error.length > 0) {
        return {
          code: 400,
          message: "Ha ocurrido un problema al ingresar los datos",
          result: error
        };
      }
      
      const index = productos.findIndex(p => p.id === Number(id));
      if (index !== -1) {
        productos[index] = actualizar;
        productos[index].id = Number(id);
        productos[index].cantidad = Number(actualizar.cantidad);
        productos[index].precio_unitario = Number(actualizar.precio_unitario);
        return {
          code: 200,
          message: "producto editado con éxito",
          result: productos[index]
        };
      } else {
        return {
          code: 404,
          message: "no hay productos registrados con ese ID",
          result: []
        };
      }
    } else {
      return {
        code: 404,
        message: "no hay productos registrados",
        result: []
      };
    }
  }
  eliminar_producto(id) {
    if (productos.length > 0) {
      const index = productos.findIndex(p => p.id === Number(id));
      if (index !== -1) {

        //Dejar en null las ventas de ese producto
        let ventas_count = 0;
        ventas_productos.forEach(venta => {
          if (venta.id_producto === Number(id)) {
            venta.id_producto = null;
            ventas_count++;
          }
        });

        //Eliminar el producto
        productos.splice(index, 1);

        return {
          code: 200,
          message: "producto eliminado con éxito",
          result: {
            ventasDesvinculadas: ventas_count,
            data: productos
          }
        };
      } else {
        return {
          code: 404,
          message: "no hay productos registrados con ese ID",
          result: []
        };
      }
    } else {
      return {
        code: 404,
        message: "no hay productos registrados",
        result: []
      };
    }
  }
}

module.exports = new ProductosModel();