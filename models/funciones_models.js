const funciones = require('../db/funciones');

class FuncionesModel {
  _validarDatos(funcion) {
    const errors = [];
    const camposObligatorios = ['id_pelicula', 'id_sala', 'fecha_hora'];
    for (const campo of camposObligatorios) {
      if (funcion[campo] === undefined || funcion[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (isNaN(funcion.id_pelicula) || funcion.id_pelicula < 0 || isNaN(funcion.id_sala)  || funcion.id_sala < 0) {
      errors.push("El id de la película, y el id de la sala deben ser números válidos");
    }

    const fecha = new Date(funcion.fecha_hora);

    if (isNaN(fecha.getTime())) {
      errors.push("Verifique el formato de la fecha");
    }

    return errors;
  }
  mostrar_funciones() {
    if (funciones.length > 0) {
      return {
        code: 200,
        message: "consulta completada con éxito",
        result: funciones
      };
    } else {
      return {
        code: 404,
        message: "no hay funciones registradas",
        result: []
      };
    }
  }
  mostrar_funciones_recientes() {
    if (funciones.length > 0) {

      const funcionesRecientes = [...funciones]
        .sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora))
        .slice(0, 5);

      return {
        code: 200,
        message: "consulta completada con éxito",
        result: funcionesRecientes
      };

    } else {
      return {
        code: 404,
        message: "no hay funciones registradas",
        result: []
      };
    }
  }
  ingresar_funcion(funcion) {
    const error = this._validarDatos(funcion);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }

    let new_id;
    if (funciones.length > 0) {
      new_id = funciones[funciones.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    funciones.push({
      id: new_id,
      id_pelicula: Number(funcion.id_pelicula),
      id_sala: Number(funcion.id_sala),
      fecha_hora: funcion.fecha_hora
    });
    return {
      code: 200,
      message: "función agregada con éxito",
      result: funciones
    };
  }
}

module.exports = new FuncionesModel();