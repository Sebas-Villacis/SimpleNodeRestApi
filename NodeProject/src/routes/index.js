const { Router } = require('express');
const { validateUser } = require("../validations");
const router = Router();


const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/users', validateUser, createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', validateUser, updateUser)
router.delete('/users/:id', deleteUser);

module.exports = router;