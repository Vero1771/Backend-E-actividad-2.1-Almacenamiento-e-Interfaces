var express = require('express');
var router = express.Router();
const Ventas_Productos_Controller = require('../controllers/ventas_productos_controllers');
let result;

/* (GET) Mostrar todos los productos vendidos */
router.get('/mostrar', function(req, res, next) {
  result = Ventas_Productos_Controller.mostrar_productos_vendidos()
  res.status(result.code).send(result)
});

/* (POST) Ingresar productos vendidos */
router.post('/ingresar', function(req, res, next) {
  result = Ventas_Productos_Controller.ingresar_producto_vendido(req.body)
  res.status(result.code).send(result)
});

module.exports = router;