"use strict";
const express = require('express');
const router = express.Router();
const { login, loginPage } = require('../Controllers/login.controller.js');
router.get('/', loginPage);
router.post('/userValidate', login);
module.exports = router;