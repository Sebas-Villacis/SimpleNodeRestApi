const { Router } = require('express');
const router = Router();


const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

module.exports = router;