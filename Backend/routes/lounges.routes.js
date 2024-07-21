const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getLounges,
	getLounge,
	createLounge,
	deleteLounge,
	updateLayout,
	updateTable
} = require('../controllers/lounge.controller.js');

const router = express.Router();

router.get('/lounges',authRequired, getLounges);
router.post('/lounges',authRequired, createLounge);
router.get('/lounges/:id',authRequired, getLounge);
router.delete('/lounges/:id',authRequired, deleteLounge);

// Ruta  para actualizar el estado de mesas
router.put('/lounges/:id/:index',authRequired, updateTable);

// Ruta para actualizar el layout de un salón
router.put('/lounges/:id',authRequired, updateLayout);

module.exports = router;
