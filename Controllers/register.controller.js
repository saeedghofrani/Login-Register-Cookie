"use strict";
const database = require('../db/userData.db.json');
const registerValidation = require('../Models/registerValidation.js')
const inp_validation = require('../Models/inp_validation');
const overRightDatabase = require('../Models/overRightDatabase.js');
const registerPage = (request, response) => { response.render('register', { ERROR: '' }); };
const register = (request, response) => {
    const userExist = registerValidation(request, database);
    const inputValidation = inp_validation(request);
    const { username, email, password, gender } = request.body;
    if (inputValidation.length > 0) return response.render('register', { ERROR: inputValidation });
    else if (userExist) {
        database.push({ username, email, password, gender, isLoggedIn: false, role: "user" });
        overRightDatabase(database);
        return response.redirect('http://localhost:4000/login');
    }
    console.log(inputValidation, userExist);
    return response.render('register', { ERROR: 'TRY ANOTHER USERNAME' });
};
module.exports = { registerPage, register };