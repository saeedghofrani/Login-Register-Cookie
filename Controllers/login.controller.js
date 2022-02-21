"use strict";
const database = require('../db/userData.db.json');
const CookiesData = require('../db/currentUsers.db.json');
const validate = require('../Models/userValidation.js');
const userdetail = require('../Models/userDetail.js');
const { v1: uuidv1, v4: uuidv4, } = require('uuid');
const overRightDatabase = require('../Models/overRightDatabase.js');
const { updateCurrentUser, checkUser, deleteUser } = require('../Models/usersCoocki.js');
const loginPage = (request, response) => {
    var GUID = request.cookies.UID;
    if (GUID !== undefined) {      console.log('ssssssssssssssssss');
        let user = checkUser(GUID, CookiesData, database);
        if (user) {
            user.isLoggedIn = true;
            overRightDatabase(database);
            response.redirect('/home');
        }
    }
    response.render('login', { ERROR: '' });
};
const login = (request, response) => {
    const userValidate = validate(request, database);
    const user = userdetail(request, database);
    if (userValidate) {
        let newGUID;
        user.isLoggedIn = true;
        // check if client sent cookie
        var cookie = request.cookies.UID;
        if (cookie === undefined) {
            // no: set a new cookie
            newGUID = uuidv1();
            response.cookie('UID', newGUID, { httpOnly: true, secure: true });
            console.log('cookie created successfully');
        } else {
            // yes, cookie was already present 
            newGUID = cookie;
            console.log('cookie exists', cookie);
        }
        overRightDatabase(database);
        updateCurrentUser(newGUID, user.username, CookiesData);
        return response.redirect('/home');
    }
    return response.render('login', { ERROR: 'WRONG USERNAME OR PASSWORD PLEASE TRY AGAIN' });
};

module.exports = { loginPage, login };