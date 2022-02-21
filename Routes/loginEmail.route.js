"use strict";
const express = require('express');
const router = express.Router();
const { loginEmail, loginEmailPage } = require('../Controllers/loginEmail.controller.js');
router.get('/', loginEmailPage);
router.post('/userValidateEmail', loginEmail);
module.exports = router;