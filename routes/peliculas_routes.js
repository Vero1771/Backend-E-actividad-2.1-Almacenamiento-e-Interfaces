var express = require('express');
var router = express.Router();
const Peliculas_Controller = require('../controllers/peliculas_controllers');

/* (GET) Mostrar todas las películas */
router.get('/mostrar', function (req, res, next) {
  Peliculas_Controller.mostrar_peliculas()
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
});

/* (GET) Mostrar películas por su ID */
router.get('/buscar/:id', function (req, res, next) {
  Peliculas_Controller.mostrar_peliculas_por_id(req.params.id)
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
});

/* (POST) Ingresar películas */
router.post('/ingresar', function (req, res, next) {
  const { categorias = [], ...datosPelicula } = req.body;

  Peliculas_Controller.ingresar_pelicula(datosPelicula, categorias)
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code || 500).json(err));  
});

/* (PUT) Editar películas */
router.put('/editar/:id', function (req, res, next) {
  const { categorias, ...datosPelicula } = req.body;
  const id = req.params.id;
  Peliculas_Controller.editar_pelicula(id, datosPelicula, categorias)
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code || 500).json(err));
  //res.redirect('/peliculas'); // Redirigir a la lista tras editar
});

/* (DELETE) Eliminar películas por su ID */
router.delete('/eliminar/:id', function (req, res, next) {
  Peliculas_Controller.eliminar_pelicula(req.params.id)
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
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