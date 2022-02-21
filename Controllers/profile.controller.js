"use strict";
const database = require('../db/userData.db.json');
const CookiesData = require('../db/currentUsers.db.json');
const { checkUser, changeUser, deleteUser } = require('../Models/usersCoocki.js');
const overRightDatabase = require('../Models/overRightDatabase.js');
const usernameDuplicate = require('../Models/usernameDuplicate.js');
const profile = (request, response) => {
    var GUID = request.cookies.UID;
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);

        if (user && user.isLoggedIn) { return response.render('profile', { data: user }); }
        deleteUser(user.username, CookiesData);
        user.isLoggedIn = false;
    }
    response.redirect('/login');
};
const profileChange = (request, response) => {
    var GUID = request.cookies.UID;
    const { username, email, password, gender } = request.body;
    console.log(GUID);
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);
        console.log(user);
        if (user && user.isLoggedIn) {
            if (!usernameDuplicate(username.trim(), database) && username.trim() !== user.username) {
                return response.send('exist');
            }
            changeUser(username.trim(), GUID, CookiesData);
            user.username = username.trim();
            user.email = email.trim();
            user.password = password.trim();
            user.gender = gender.trim();
            overRightDatabase(database);
            return response.send(user);
        }
    }
    response.send('wrong');
};
const home = (request, response) => {
    var GUID = request.cookies.UID;
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);
        if (user && user.isLoggedIn === true) { return response.render('home'); }
        if (user) { deleteUser(user.username, CookiesData); user.isLoggedIn = false; }
    }
    response.redirect('/login');
};
module.exports = { profile, profileChange, home };