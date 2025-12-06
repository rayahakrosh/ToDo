const express = require('express');
const router = express.Router();
const {getAllCategories, addCategory, getOneCategory, deleteCategory} = require('../controller/categories_C');
const {valuesToAdd, isValidId} = require('../middelware/categories_MID.js');
const {isLoggedIn} = require('../middelware/auth_MID');

router.get('/', isLoggedIn, getAllCategories);

router.post('/', isLoggedIn, valuesToAdd, addCategory);

router.get('/:id', isLoggedIn, isValidId, getOneCategory);

router.delete('/:id', isLoggedIn, isValidId, deleteCategory);

module.exports = router;
