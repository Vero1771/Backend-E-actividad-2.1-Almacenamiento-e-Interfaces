const pool = require('../db/connection_db');

class EntradasModel {
  static _validarDatos(entrada) {
    const errors = [];
    const camposObligatorios = ['id_venta', 'id_funcion', 'asiento', 'precio'];
    for (const campo of camposObligatorios) {
      if (entrada[campo] === undefined || entrada[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (typeof (entrada.asiento) !== "string") {
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
  static mostrar_entradas() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT entradas.id_entrada, peliculas.titulo As "pelicula", salas.nombre As "sala", asientos.id_asiento, asientos.nombre As "asiento", funciones.id_funcion, funciones.fecha_hora As "fecha_funcion", ventas.id_venta, ventas.fecha As "fecha_venta", entradas.precio FROM `entradas` JOIN `funciones` ON entradas.id_funcion = funciones.id_funcion JOIN `peliculas` ON peliculas.id_pelicula = funciones.id_pelicula JOIN `salas` ON salas.id_sala = funciones.id_sala JOIN `asientos` ON entradas.id_asiento = asientos.id_asiento JOIN `ventas` ON entradas.id_venta = ventas.id_venta ORDER BY entradas.id_entrada;')
        .then(([rows]) => {
          resolve({ code: 200, message: "consulta completada con éxito", result: rows })
        })
        .catch(err =>
          reject({ code: 500, message: err.message, result: [err] })
        );
    });
  }
  static mostrar_entradas_por_id(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT entradas.id_entrada, peliculas.titulo As "pelicula", salas.nombre As "sala", asientos.id_asiento, asientos.nombre As "asiento", funciones.id_funcion, funciones.fecha_hora As "fecha_funcion", ventas.id_venta, ventas.fecha As "fecha_venta", entradas.precio FROM `entradas` JOIN `funciones` ON entradas.id_funcion = funciones.id_funcion JOIN `peliculas` ON peliculas.id_pelicula = funciones.id_pelicula JOIN `salas` ON salas.id_sala = funciones.id_sala JOIN `asientos` ON entradas.id_asiento = asientos.id_asiento JOIN `ventas` ON entradas.id_venta = ventas.id_venta WHERE id_entrada = ?', id)
        .then(([rows]) => {
          if (rows.length > 0) {
            resolve({ code: 200, message: "consulta completada con éxito", result: rows })
          }
          resolve({ code: 404, message: "no hay entradas registradas con ese ID", result: rows })
        })
        .catch(err =>
          reject({ code: 500, message: err.message, result: [err] })
        );
    });
  }
  static ingresar_entrada(entrada) {
    return new Promise((resolve, reject) => {
      const error = EntradasModel._validarDatos(entrada);
      if (error.length > 0) {
        reject({ code: 400, message: "Ha ocurrido un problema al ingresar los datos", result: error })
        return;
      }
      pool.query('INSERT INTO `entradas` SET ?', entrada)
        .then(([rows]) => {
          resolve({ code: 200, message: "consulta completada con éxito", result: [rows] })
        })
        .catch(err =>
          reject({ code: 500, message: err.message, result: [err] })
        );
    });
  }
}

module.exports = EntradasModel;