var express = require('express');
var router = express.Router();
const Ventas_Controller = require('../controllers/ventas_controllers');
let result;

/* (GET) Mostrar ventas en un rango de fecha */
router.get('/rango', function (req, res, next) {
  result = Ventas_Controller.mostrar_ventas_por_rango(req.query)
  res.status(result.code).send(result)
});

/* (POST) Ingresar ventas */
router.post('/ingresar', function (req, res, next) {
  result = Ventas_Controller.ingresar_venta(req.body)
  res.status(result.code).send(result)
});

module.exports = router;