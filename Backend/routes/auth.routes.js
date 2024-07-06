const express = require('express');
const {
	login,
	logout,
	verifyToken,
} = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verifyToken);

module.exports = router;
