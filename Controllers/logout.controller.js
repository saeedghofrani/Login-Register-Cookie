const CookiesData = require('../db/currentUsers.db.json');
const database = require('../db/userData.db.json');
const { checkUser, deleteUser } = require('../Models/usersCoocki.js');
const overRightDatabase = require('../Models/overRightDatabase.js');
const logout = (request, response) => {
    var GUID = request.cookies.UID;
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);
        if (user) {
            console.log('delete' + GUID);
            deleteUser(user.username, CookiesData);
            user.isLoggedIn = false;
            overRightDatabase(database);
        }
    }
    response.send('kh');
};
const logoutGet = (request, response) => {
    var GUID = request.cookies.UID;
    if (GUID !== undefined) {
        let user = checkUser(GUID, CookiesData, database);
        if (user) {
            console.log('delete' + GUID);
            deleteUser(user.username, CookiesData);
            user.isLoggedIn = false;
            overRightDatabase(database);
        }
    }
    response.redirect('/login');
};
module.exports = { logout, logoutGet };