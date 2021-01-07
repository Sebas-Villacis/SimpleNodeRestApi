//const models = require('../models');
const {
    allUsers,
    userById,
    newUser,
    userUpdated,
    userDeleted,
} = require("../services/user.service");

const getUsers = (req, res) => {
    allUsers(req, res);
};

const getUserById = (req, res) => {
    userById(req, res);
};

const createUser = (req, res) => {
    newUser(req, res);
};
const updateUser = (req, res) => {
    userUpdated(req, res);
};

const deleteUser = (req, res) => {
    userDeleted(req, res);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
