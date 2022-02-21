"use strict";
const database = require('../db/userData.db.json');
const validateEmail = require('../Models/userValidationEmail.js');
const userdetailEmail = require('../Models/userDetailEmail.js');
const CookiesData = require('../db/currentUsers.db.json');
const { updateCurrentUser, deleteUser, checkUser } = require('../Models/usersCoocki');
const overRightDatabase = require('../Models/overRightDatabase.js');
const loginEmailPage = (request, response) => {
    var GUID = request.cookies.UID;
    console.log(GUID);
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);
        if (user) {
            console.log('delete' + GUID);
            deleteUser(user.username, CookiesData);
            user.isLoggedIn = false;
            overRightDatabase(database);
        }
    }
    response.render('loginEmail', { ERROR: '' });
};
const loginEmail = (request, response) => {
    const userValidateEmail = validateEmail(request, database);
    const userEmail = userdetailEmail(request, database);
    if (userValidateEmail) {
        let newGUID;
        userEmail.isLoggedIn = true;
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
        updateCurrentUser(newGUID, userEmail.username, CookiesData);
        overRightDatabase(database);
        return response.render('profile', { data: userEmail });
    }
    return response.render('loginEmail', { ERROR: 'WRONG USERNAME OR EMAIL PLEASE TRY AGAIN' });
};
module.exports = { loginEmailPage, loginEmail };