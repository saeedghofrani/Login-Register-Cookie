"use strict";
const express = require('express');
const router = express.Router();
const { profile, profileChange, home } = require('../Controllers/profile.controller.js');
router.get('/', home);
router.get('/profile', profile);
router.post('/profile', profileChange);
module.exports = router;