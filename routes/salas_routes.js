var express = require('express');
var router = express.Router();
const Salas_Controller = require('../controllers/salas_controllers');
let result;

/* (GET) Mostrar todas las salas */
router.get('/mostrar', function (req, res, next) {
  result = Salas_Controller.mostrar_salas()
  res.status(result.code).send(result)
});

/* (POST) Ingresar salas */
router.post('/ingresar', function(req, res, next) {
  result = Salas_Controller.ingresar_sala(req.body)
  res.status(result.code).send(result)
});

module.exports = router;