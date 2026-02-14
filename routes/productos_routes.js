var express = require('express');
var router = express.Router();
const Productos_Controller = require('../controllers/productos_controllers');
let result;

/* (GET) Mostrar todos los productos */
router.get('/mostrar', function(req, res, next) {
  result = Productos_Controller.mostrar_productos()
  res.status(result.code).send(result)
});

/* (GET) Mostrar productos por su ID */
router.get('/buscar/:id', function (req, res, next) {
  result = Productos_Controller.mostrar_productos_por_id(req.params.id)
  res.status(result.code).send(result)
});

/* (POST) Ingresar productos */
router.post('/ingresar', function(req, res, next) {
  result = Productos_Controller.ingresar_producto(req.body)
  res.status(result.code).send(result)
});

/* (PUT) Editar productos */
router.put('/editar/:id', function(req, res, next) {
  result = Productos_Controller.editar_producto(req.params.id, req.body)
  res.status(result.code).send(result) 
});

/* (DELETE) Eliminar productos por su ID */
router.delete('/eliminar/:id', function(req, res, next) {
  result = Productos_Controller.eliminar_producto(req.params.id)
  res.status(result.code).send(result)
});

/* VIEWS EJS */

/* (GET) */
router.get('/', function (req, res, next) {
  const productos_list = Productos_Controller.mostrar_productos();
  res.render('./productos_views/productos', { title: 'Productos', productos_list: productos_list.result });
});

/* (POST) */
router.get('/ingresar', function (req, res, next) {
  res.render('./productos_views/ingresar_productos', { title: 'Productos' });
});

/* (PUT) Mostrar formulario de edición */
router.get('/actualizar/:id', function (req, res, next) {
  const result = Productos_Controller.mostrar_productos_por_id(req.params.id);
  res.render('./productos_views/editar_productos', { 
    title: 'Editar Producto', 
    product: result.result
  });
});

module.exports = router;