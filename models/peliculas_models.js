const peliculas = require('../db/peliculas');
const funciones = require('../db/funciones');
const entradas = require('../db/entradas');

class PeliculasModel {
  _validarDatos(peli) {
    const errors = [];
    const camposObligatorios = ['titulo', 'anio', 'duracion', 'categoria', 'clasificacion'];
    for (const campo of camposObligatorios) {
      if (peli[campo] === undefined || peli[campo] === null) errors.push(`El campo ${campo} es obligatorio`);
    }

    if (typeof(peli.titulo) !== "string" || typeof(peli.clasificacion) !== "string") {
      errors.push("El título y la clasificación deber ser una cadena de texto");
    }

    if (isNaN(peli.anio) || peli.anio < 0 || isNaN(peli.duracion) || peli.duracion < 0) {
      errors.push("El año y la duración deben ser números válidos");
    }

    return errors;
  }
  mostrar_peliculas() {
    if (peliculas.length > 0) {
      return {
        code: 200,
        message: "consulta completada con éxito",
        result: peliculas
      };
    } else {
      return {
        code: 404,
        message: "no hay películas registradas",
        result: []
      };
    }
  }
  mostrar_peliculas_por_id(id) {
    if (peliculas.length > 0) {
      const index = peliculas.findIndex(p => p.id === Number(id));
      if (index !== -1) {
        return {
          code: 200,
          message: "consulta completada con éxito",
          result: peliculas[index]
        };
      } else {
        return {
          code: 404,
          message: "no hay películas registradas con ese ID",
          result: []
        };
      }
    } else {
      return {
        code: 404,
        message: "no hay películas registradas",
        result: []
      };
    }
  }
  ingresar_pelicula(peli) {
    const error = this._validarDatos(peli);
    if (error.length > 0) {
      return {
        code: 400,
        message: "Ha ocurrido un problema al ingresar los datos",
        result: error
      };
    }

    let new_id;
    if (peliculas.length > 0) {
      new_id = peliculas[peliculas.length - 1].id + 1;
    } else {
      new_id = 1;
    }

    if (typeof(peli.categoria) === "string") { //En caso de que llegue una categoría por el checkbox
      peli.categoria = [peli.categoria];
    } else if (!peli.categoria) {
      peli.categoria = []; // En caso de que no se marque ninguna
    }

    peliculas.push({
      id: new_id,
      titulo: peli.titulo,
      anio: Number(peli.anio),
      duracion: Number(peli.duracion),
      categoria: peli.categoria,
      clasificacion: peli.clasificacion
    });

    return {
      code: 200,
      message: "película agregada con éxito",
      result: peliculas
    };
  }
  editar_pelicula(id, actualizar) {
    if (peliculas.length > 0) {

      const error = this._validarDatos(actualizar);
      if (error.length > 0) {
        return {
          code: 400,
          message: "Ha ocurrido un problema al ingresar los datos",
          result: error
        };
      }

      if (typeof(actualizar.categoria) === "string") { //En caso de que llegue una categoría por el checkbox
        actualizar.categoria = [actualizar.categoria];
      } else if (!actualizar.categoria) {
        actualizar.categoria = []; // En caso de que no se marque ninguna
      }

      const index = peliculas.findIndex(p => p.id === Number(id));
      if (index !== -1) {
        peliculas[index] = actualizar;
        peliculas[index].id = Number(id);
        peliculas[index].anio = Number(actualizar.anio);
        peliculas[index].duracion = Number(actualizar.duracion);
        return {
          code: 200,
          message: "película editada con éxito",
          result: peliculas[index]
        };
      } else {
        return {
          code: 404,
          message: "no hay películas registradas con ese ID",
          result: []
        };
      }
    } else {
      return {
        code: 404,
        message: "no hay películas registradas",
        result: []
      };
    }
  }
  eliminar_pelicula(id) {
    if (peliculas.length > 0) {
      const idPeli = Number(id);
      const index = peliculas.findIndex(p => p.id === Number(id));
      if (index !== -1) {

        //Guardar los ID de todas las funciones de esa película antes de borrarlas
        const funcionesABorrar = funciones
          .filter(f => f.id_pelicula === idPeli)
          .map(f => f.id);

        //Colocar las entradas de esas funciones en Null
        let entradas_count = 0;
        entradas.forEach(entrada => {
          if (funcionesABorrar.includes(entrada.id_funcion)) {
            entrada.id_funcion = null;
            entradas_count++;
          }
        });

        //Eliminar las funciones de la película
        for (let i = funciones.length - 1; i >= 0; i--) {
          if (funciones[i].id_pelicula === idPeli) {
            funciones.splice(i, 1);
          }
        }

        //Eliminar la película
        peliculas.splice(index, 1);

        return {
          code: 200,
          message: "película eliminada con éxito",
          result: {
            funcionesEliminadas: funcionesABorrar.length,
            entradasDesvinculadas: entradas_count,
            data: peliculas
          }
        };
      } else {
        return {
          code: 404,
          message: "no hay películas registradas con ese ID",
          result: []
        };
      }
    } else {
      return {
        code: 404,
        message: "no hay películas registradas",
        result: []
      };
    }
  }
}

module.exports = new PeliculasModel();