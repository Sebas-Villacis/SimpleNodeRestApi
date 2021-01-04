//const { response } = require('express');
const { validationResult, check } = require('express-validator');
import User from '../models/User';
// const { Pool } = require('pg');
// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: '',
//     database: 'Firstapi',
//     port: '5432'
// })

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({
            data: users
        });
    } catch (e) {
        console.log(e);
    }

    // const response = await pool.query('SELECT * FROM users');
    //res.status(200).json(response.rows);

}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id
            }
        });
        res.json(user);
    }
    catch (e) {
        console.log(e);
    }

    //const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    //res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    let newUser = await User.create({
        name,
        email
    }, {
        fields: ['name', 'email']
    });
    check('email', 'Email is not valid.').isEmail();
    check('name', 'Name is not valid').exists().isLength({ min: 5 }).trim().escape();

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //await pool.query('INSERT INTO users (name, email) VALUES ($1,$2)', [name, email]);
        if (newUser) {
            return res.json({
                message: 'User created successfully',
                data: newUser
            });
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        })
    }



}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    check('email', 'Email is not valid.').isEmail();
    //Transformed malkicious code into special HTML characters
    check('name', 'Name is not valid').exists().isLength({ min: 5 }).trim().escape();
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;

        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
            where: {
                id
            }
        });
        if (users.length > 0) {
            users.forEach(async user => {
                await user.update({
                    name,
                    email
                });
            })
        }

        return res.json({
            message: 'User updated successfully',
            data: users
        })

    }
    catch (e) {
        console.log(e);
    }

    // const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
    //     name,
    //     email,
    //     id
    // ]);
    // res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await User.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'User deleted successfully',
            count: deleteRowCount
        })
    }
    catch (e) {
        console.log(e);
    }
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};