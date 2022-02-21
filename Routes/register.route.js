"use strict";
const express = require('express');
const router = express.Router();
const { registerPage, register } = require('../Controllers/register.controller.js');
router.get('/', registerPage);
router.post('/userRegister', register);
module.exports = router;