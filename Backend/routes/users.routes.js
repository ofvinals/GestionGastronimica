const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser,
} = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', authRequired, getUser);
router.post('/users', authRequired, createUser);
router.delete('/users/:id', authRequired, deleteUser);
router.put('/users/:id', authRequired, updateUser);

module.exports = router;
