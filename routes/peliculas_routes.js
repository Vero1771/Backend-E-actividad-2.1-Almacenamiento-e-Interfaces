var express = require('express');
var router = express.Router();
const Peliculas_Controller = require('../controllers/peliculas_controllers');
let result;

/* (GET) Mostrar todas las películas */
router.get('/mostrar', function (req, res, next) {
  result = Peliculas_Controller.mostrar_peliculas()
  res.status(result.code).send(result)
});

/* (GET) Mostrar películas por su ID */
router.get('/buscar/:id', function (req, res, next) {
  result = Peliculas_Controller.mostrar_peliculas_por_id(req.params.id)
  res.status(result.code).send(result)
});

/* (POST) Ingresar películas */
router.post('/ingresar', function (req, res, next) {
  result = Peliculas_Controller.ingresar_pelicula(req.body)
  res.status(result.code).send(result)
});

/* (PUT) Editar películas */
router.put('/editar/:id', function (req, res, next) {
  result = Peliculas_Controller.editar_pelicula(req.params.id, req.body)
  res.status(result.code).send(result)
  //res.redirect('/peliculas'); // Redirigir a la lista tras editar
});

/* (DELETE) Eliminar películas por su ID */
router.delete('/eliminar/:id', function (req, res, next) {
  result = Peliculas_Controller.eliminar_pelicula(req.params.id)
  res.status(result.code).send(result);
});

/* VIEWS EJS */

/* (GET) */
router.get('/', function (req, res, next) {
  const peliculas_list = Peliculas_Controller.mostrar_peliculas();
  res.render('./peliculas_views/peliculas', { title: 'Películas', peliculas_list: peliculas_list.result });
});

/* (POST) */
router.get('/ingresar', function (req, res, next) {
  res.render('./peliculas_views/ingresar_peliculas', { title: 'Películas' });
});

/* (PUT) Mostrar formulario de edición */
router.get('/actualizar/:id', function (req, res, next) {
  const result = Peliculas_Controller.mostrar_peliculas_por_id(req.params.id);
  res.render('./peliculas_views/editar_peliculas', { 
    title: 'Editar Película', 
    peli: result.result
  });
});


module.exports = router;