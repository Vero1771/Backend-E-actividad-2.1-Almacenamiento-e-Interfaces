var express = require('express');
var router = express.Router();
const Funciones_Controller = require('../controllers/funciones_controllers');
const Peliculas_Controller = require('../controllers/peliculas_controllers');
const Salas_Controller = require('../controllers/salas_controllers');
let result;

/* (GET) Mostrar todas las funciones */
router.get('/mostrar', function (req, res, next) {
  result = Funciones_Controller.mostrar_funciones()
  res.status(result.code).send(result)
});

/* (GET) Mostrar las últimas 5 funciones recientes */
router.get('/funciones_recientes', function (req, res, next) {
  result = Funciones_Controller.mostrar_funciones_recientes()
  res.status(result.code).send(result)
});

/* (POST) Ingresar funciones */
router.post('/ingresar', function (req, res, next) {
  result = Funciones_Controller.ingresar_funcion(req.body)
  res.status(result.code).send(result)
});

/* VIEWS EJS */

/* (GET) */
router.get('/recientes', function (req, res, next) {
  const funciones = Funciones_Controller.mostrar_funciones_recientes().result;
  const peliculas = Peliculas_Controller.mostrar_peliculas().result;
  const salas = Salas_Controller.mostrar_salas().result;

  const funciones_list = funciones.map(funcion => {
      // Buscar las peliculas y salas que coincidan con los ID
      const pelicula = peliculas.find(p => p.id === funcion.id_pelicula);
      const sala = salas.find(s => s.id === funcion.id_sala);

      return { //Reemplazar coincidencia, sino colocar un mensaje de error
        id: funcion.id,
        pelicula: pelicula ? pelicula.titulo : "Película no encontrada",
        sala: sala ? sala.nombre : "Sala no encontrada",
        fecha_hora: funcion.fecha_hora
      };
    });

  res.render('./funciones_views/funciones_recientes', { title: 'Funciones', funciones_list: funciones_list });
});


module.exports = router;