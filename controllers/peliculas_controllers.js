const Peliculas_Model = require('../models/peliculas_models');
let result;

class PeliculasController {
  mostrar_peliculas() {
    result = Peliculas_Model.mostrar_peliculas();
    return result;
  }
  mostrar_peliculas_por_id(id) {
    result = Peliculas_Model.mostrar_peliculas_por_id(id);
    return result;
  }
  ingresar_pelicula(peli) {
    result = Peliculas_Model.ingresar_pelicula(peli);
    return result;
  }
  editar_pelicula(id, actualizar) {
    result = Peliculas_Model.editar_pelicula(id, actualizar);
    return result;
  }
  eliminar_pelicula(id) {
    result = Peliculas_Model.eliminar_pelicula(id);
    return result;
  }
}

module.exports = new PeliculasController();