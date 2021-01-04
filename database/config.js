const { Sequelize } = require('sequelize');
export const sequelize = new Sequelize(
    //Database name
    'Firstapi',
    //User name
    'postgres',
    //Password
    '',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 1000
        }
    }

);