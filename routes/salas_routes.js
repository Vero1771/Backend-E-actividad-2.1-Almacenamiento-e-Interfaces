var express = require('express');
var router = express.Router();
const Salas_Controller = require('../controllers/salas_controllers');

/* (GET) Mostrar todas las salas */
router.get('/mostrar', (req, res) => {
	Salas_Controller.mostrar_salas()
		.then(r => res.status(r.code).json(r))
		.catch(err => res.status(err.code).json(err));
});

/* (GET) Buscar una sala por su ID */
router.get('/buscar/:id', (req, res) => {
	Salas_Controller.mostrar_salas_por_id(req.params.id)
		.then(r => res.status(r.code).json(r))
		.catch(err => res.status(err.code).json(err));
});

/* (POST) Ingresar salas */
router.post('/ingresar', (req, res) => {
	Salas_Controller.ingresar_sala(req.body)
		.then(r => res.status(r.code).json(r))
		.catch(err => res.status(err.code).json(err));
});

module.exports = router;