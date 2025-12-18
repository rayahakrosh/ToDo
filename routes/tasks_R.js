const express = require('express');
const router = express.Router();
const { getAllTasks, addTask } = require('../controller/tasks_C');
const { isLoggedIn } = require('../middelware/auth_MID');

router.get('/', isLoggedIn, getAllTasks);


router.post('/', isLoggedIn, addTask);

module.exports = router;
