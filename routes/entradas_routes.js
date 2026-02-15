var express = require('express');
var router = express.Router();
const Entradas_Controller = require('../controllers/entradas_controllers');

/* (GET) Mostrar todas las entradas */

router.get('/mostrar', (req, res) => {
	Entradas_Controller.mostrar_entradas()
		.then(r => res.status(r.code).json(r))
		.catch(err => res.status(err.code).json(err));
}); 

/* (GET) Buscar una entrada por su ID */
router.get('/buscar/:id', (req, res) => {
	Entradas_Controller.mostrar_entradas_por_id(req.params.id)
		.then(r => res.status(r.code).json(r))
		.catch(err => res.status(err.code).json(err));
});

/* (POST) Ingresar entradas */
router.post('/ingresar', (req, res) => {
	Entradas_Controller.ingresar_entrada(req.body)
		.then(r => res.status(r.code).json(r))
		.catch(err => res.status(err.code).json(err));
});

module.exports = router;