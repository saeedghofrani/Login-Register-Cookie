"use strict";
const express = require('express');
const router = express.Router();
const homeRouter = require('./home.route.js');
const registerRouter = require('./register.route.js');
const loginRouter = require('./login.route.js');
const loginEmailRouter = require('./loginEmail.route.js');
const adminRouter = require('../Routes/admin.route.js');
const logoutRouter = require('../Routes/logout.route.js')
router.use((req, res, next) => {
    console.log(`request was made: ${req.url}`);
    next();
});
router.use('/', adminRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/loginEmail', loginEmailRouter);
router.use('/home', homeRouter);
router.use('/logout', logoutRouter);
module.exports = router;