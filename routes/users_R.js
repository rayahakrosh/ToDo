const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser} = require('../controller/users_C.js');
const {isValidId} = require('../middelware/users_MID');

router.get('/',getAllUsers);
router.get('/:id',isValidId,getOneUser);

module.exports = router;
