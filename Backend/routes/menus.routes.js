const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getMenus,
	getMenu,
	createMenu,
	deleteMenu,
	updateMenu,
	updateIngredients,

	getCategorys,
	getCategory,
	createCategory,
	deleteCategory,
	updateCategory,
} = require('../controllers/menu.controller.js');

const router = express.Router();

router.get('/menus',authRequired, getMenus);
router.get('/menus/:id',authRequired, getMenu);
router.post('/menus',authRequired, createMenu);
router.delete('/menus/:id',authRequired, deleteMenu);
router.put('/menus/:id',authRequired, updateMenu);
router.put('/menus/:id',authRequired, updateIngredients);

router.get('/categorys',authRequired, getCategorys);
router.get('/categorys/:id',authRequired, getCategory);
router.post('/categorys',authRequired, createCategory);
router.delete('/categorys/:id',authRequired, deleteCategory);
router.put('/categorys/:id',authRequired, updateCategory);
module.exports = router;
