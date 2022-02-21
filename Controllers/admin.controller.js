"use strict";
const database = require('../db/userData.db.json');
const email = require('../Models/randomEmail.js');
const password = require('../Models/randomPassword.js');
const CookiesData = require('../db/currentUsers.db.json');
const { checkUser, deleteUser } = require('../Models/usersCoocki.js');
const overRightDatabase = require('../Models/overRightDatabase.js');
const generateAdmin = (request, response, next) => {
    const admin = database.find(obj => obj.role === "admin");
    if (admin) { console.log(admin); next(); }
    else {
        const randomePassword = password();
        database.push({
            username: 'mashala',
            email: email('@gmail.com', 'ADMIN'),
            password: randomePassword,
            gender: 'none',
            isLoggedIn: false,
            role: "admin"
        });
        overRightDatabase(database);
        console.log("current admin: " + 'mashala' + " pass: " + randomePassword);
        next();
    }

};
const adminProfile = (request, response) => {
    var GUID = request.cookies.UID;
    console.log(GUID);
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);
        if (user && user.role === 'admin' && user.isLoggedIn === true) { return response.render('adminProfile', { data: database, objKeys: Object.keys(database[11]) }); }
        if (user) { deleteUser(user.username, CookiesData); user.isLoggedIn = false; }
    }
    response.redirect('/login');
};
const adminProfileChange = (request, response) => {
    const userArray = request.body;
    console.log(request.body);
    for (let i = 0; i < database.length; i++) {
        for (let j = 0; j < userArray.length; j++) {
            if (database[i].username === userArray[j].username) {
                database[i].role = userArray[j].role;
                database[i].gender = userArray[j].gender;
                database[i].email = userArray[j].email;
                break;
            }
        }
    }
    overRightDatabase(database);
    console.log('done over right database admin');
    response.send(userArray);
};

module.exports = { generateAdmin, adminProfile, adminProfileChange };