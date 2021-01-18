const { } = require('express');

const { authLogin } = require('../services/auth.service');


const login = (req, res) => {

    authLogin(req, res);
}

module.exports = { login };