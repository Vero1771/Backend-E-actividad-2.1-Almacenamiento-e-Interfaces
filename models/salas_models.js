const salas = require('../db/salas');

class SalasModel {
  _validarDatos(sala) {
    const errors = [];
    const camposObligatorios = ['nombre', 'capacidad'];
    for (const campo of camposObligatorios) {
      if (sala[campo] === undefined || sala[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (typeof(sala.nombre) !== "string") {
      errors.push("El nombre de la sala debe ser una cadena de texto");
    }

    if (isNaN(sala.capacidad) || sala.capacidad < 0) {
      errors.push("La capacidad de la sala debe ser un número válido");
    }

    return errors;
  }
  mostrar_salas() {
    if (salas.length > 0) {
      return {
        code: 200,
        message: "consulta completada con éxito",
        result: salas
      };
    } else {
      return {
        code: 404,
        message: "no hay salas registradas",
        result: []
      };
    }
  }
  ingresar_sala(sala) {
    const error = this._validarDatos(sala);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }

    let new_id;
    if (salas.length > 0) {
      new_id = salas[salas.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    salas.push( {
      id: new_id,
      nombre: sala.nombre,
      capacidad: Number(sala.capacidad)
    });
    return {
      code: 200,
      message: "sala agregada con éxito",
      result: salas
    };
  }
}

module.exports = new SalasModel();