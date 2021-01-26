const Sequelize = require("sequelize");
const config = require("../database/db.config");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  define: {
    timestamps: false,
  },
  pool: {
    max: config.max,
    min: config.min,
    acquire: config.acquire,
    idle: config.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user")(sequelize, Sequelize);
db.hospitals = require("../models/hospital")(sequelize, Sequelize);
module.exports = db;
