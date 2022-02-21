"use strict";
const express = require('express');
const router = express.Router();
const { generateAdmin, adminProfile, adminProfileChange } = require('../Controllers/admin.controller.js');
router.use('/', generateAdmin);
router.get('/adminProfile', adminProfile);
router.post('/adminProfileChange', adminProfileChange);
module.exports = router;