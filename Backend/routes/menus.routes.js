const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getMenus,
	getMenu,
	createMenu,
	deleteMenu,
	updateMenu,

	getCategorys,
	getCategory,
	createCategory,
	deleteCategory,
	updateCategory,
} = require('../controllers/menu.controller.js');

const router = express.Router();

router.get('/menus',  getMenus);
router.get('/menus/:id',  getMenu);
router.post ('/menus',  createMenu);
router.delete('/menus/:id',  deleteMenu);
router.put('/menus/:id',  updateMenu);

router.get('/categorys',  getCategorys);
router.get('/categorys/:id',  getCategory);
router.post ('/categorys',  createCategory);
router.delete('/categorys/:id',  deleteCategory);
router.put('/categorys/:id',  updateCategory);
module.exports = router;
