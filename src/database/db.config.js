
module.exports = {
    HOST: "localhost",
    USER: "sebastianvillacis",
    PASSWORD: "postgres",
    DB: "Firstapi",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

