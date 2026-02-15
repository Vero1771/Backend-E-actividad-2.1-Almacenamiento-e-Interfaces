var express = require('express');
var router = express.Router();
const Funciones_Controller = require('../controllers/funciones_controllers');

/* (GET) Mostrar todas las funciones */
router.get('/mostrar', (req, res) => {
  Funciones_Controller.mostrar_funciones()
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
});

/* (GET) Buscar una función por su ID */
router.get('/buscar/:id', (req, res) => {
  Funciones_Controller.mostrar_funciones_por_id(req.params.id)
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
});

/* (GET) Mostrar las últimas 5 funciones recientes */
router.get('/funciones_recientes', (req, res) => {
  Funciones_Controller.mostrar_funciones_recientes()
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
});

/* (POST) Ingresar funciones */
router.post('/ingresar', function (req, res, next) {
  Funciones_Controller.ingresar_funcion(req.body)
    .then(r => res.status(r.code).json(r))
    .catch(err => res.status(err.code).json(err));
});

/* VIEWS EJS */

/* (GET) */
router.get('/recientes', function (req, res, next) {

  const funciones_list = []

  res.render('./funciones_views/funciones_recientes', { title: 'Funciones', funciones_list: funciones_list });
});


module.exports = router;