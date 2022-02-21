"use strict";
const express = require('express');
const router = express.Router();
const { logout, logoutGet } = require('../Controllers/logout.controller.js');
router.post('/', logout);
router.get('/', logoutGet);
module.exports = router;