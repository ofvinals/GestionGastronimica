const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getLounges,
	getLounge,
	createLounge,
	deleteLounge,
	updateLounge,
	updateLayout,
	updateTable
} = require('../controllers/lounge.controller.js');

const router = express.Router();

router.get('/lounges', getLounges);
router.post('/lounges', createLounge);
router.get('/lounges/:id', getLounge);
router.put('/lounges/:id', updateLounge);
router.delete('/lounges/:id', deleteLounge);

// Ruta  para actualizar el estado de mesas
router.put('/lounges/:id/:index', updateTable);

// Ruta para actualizar el layout de un salón
router.put('/lounges/:id/layout', updateLayout);

module.exports = router;
