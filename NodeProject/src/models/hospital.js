module.exports = (sequelize, Sequelize) => {
  const Hosiptals = sequelize.define("hospitals", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
  });

  return Hosiptals;
};
