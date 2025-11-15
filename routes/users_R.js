const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, deleteUser } = require('../controllers/users_C.js');
const { isValidId } = require('../middleware/validateId.js');

router.get('/', getAllUsers);
router.get('/:id', isValidId, getOneUser);

router.delete('/:id', isValidId, deleteUser);

module.exports = router;
