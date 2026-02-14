const entradas = require('../db/entradas');

class EntradasModel {
  _validarDatos(entrada) {
    const errors = [];
    const camposObligatorios = ['id_venta', 'id_funcion', 'asiento', 'precio'];
    for (const campo of camposObligatorios) {
      if (entrada[campo] === undefined || entrada[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (typeof(entrada.asiento) !== "string") {
      errors.push("El nombre del asiento debe ser una cadena de texto");
    }

    if (isNaN(entrada.id_venta) || entrada.id_venta < 0 || isNaN(entrada.id_funcion) || entrada.id_funcion < 0) {
      errors.push("El id de la venta, el id de la función deben ser números válidos");
    }

    if (isNaN(entrada.precio) || entrada.precio < 0) {
      errors.push("El precio debe ser un número válido");
    }

    return errors;
  }
  mostrar_entradas() {
    if (entradas.length > 0) {
      return {
        code: 200,
        message: "consulta completada con éxito",
        result: entradas
      };
    } else {
      return {
        code: 404,
        message: "no hay entradas registradas",
        result: []
      };
    }
  }
  ingresar_entrada(entrada) {
    const error = this._validarDatos(entrada);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }

    let new_id;
    if (entradas.length > 0) {
      new_id = entradas[entradas.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    entradas.push({
      id: new_id,
      id_venta: Number(entrada.id_venta),
      id_funcion: Number(entrada.id_funcion),
      asiento: entrada.asiento,
      precio: Number(entrada.precio),
    });
    return {
      code: 200,
      message: "entrada agregada con éxito",
      result: entradas
    };
  }
}

module.exports = new EntradasModel();