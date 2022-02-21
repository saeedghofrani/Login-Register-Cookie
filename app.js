"use strict";
const express = require('express');
const app = express();
const { port } = require('./Models/pageHeader.js');
const { join } = require('path');
const appRoute = require('./Routes/app.route.js');
const cookieParser = require('cookie-parser');
app.use(express.static("../views"));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, './views'));
app.use(cookieParser());
app.use(express.static(join(__dirname, './Public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', appRoute);
app.use((req, res) => {
    res.status(404);
    req.accepts('html') ? res.render('notFound') : req.accepts('json') ? res.send({ error: 'Not found' }) : res.type('txt').send('Not found');
}); 
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server listening at http://localhost:${port}`);
}); 