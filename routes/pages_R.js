const express = require('express');
const router = express.Router();
const path = require('path');
const { isLoggedIn } = require('../middelware/auth_MID'); 

router.get('/', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "pages", "index.html"));
});

router.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "pages", "reg.html"));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "pages", "login.html"));
});

router.get('/users_page', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "pages", "users_management.html"));
});

router.get('/cat_page', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "pages", "cat_management.html"));
});

module.exports = router;