'use strict';
function validate(req, source) {
    let user = source.find(obj => obj.username === String(req.body.loginusername.trim()));
    return (!user) ? false : (user.email !== req.body.loginEmail.trim()) ? false : true;
}
module.exports = validate;