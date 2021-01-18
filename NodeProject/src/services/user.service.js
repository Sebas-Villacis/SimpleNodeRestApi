const models = require("../models");

const allUsers = async (req, res) => {
  try {
    const users = await models.users.findAll();
    res.json({
      ok: true,
      users,
    });
  } catch (e) {
    console.log(e);
  }
};

const userById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.users.findOne({
      where: {
        id,
      },
    });
    res.json(user);
  } catch (e) {
    console.log(e);
  }
};

const newUser = async (req, res) => {
  const { name, email } = req.body;
  const emialExists = await models.users.findOne({
    where: {
      email,
    },
  });

  if (emialExists) {
    return res.status(400).json({
      msg: "The email is already registered",
    });
  }
  const newUser = await models.users.create(
    {
      name,
      email,
    },
    {
      fields: ["name", "email"],
    }
  );

  try {
    if (newUser) {
      return res.json({
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

const userUpdated = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const users = await models.users.findAll({
      attributes: ["id", "name", "email"],
      where: {
        id,
      },
    });
    if (users.length > 0) {
      users.forEach(async (user) => {
        await user.update({
          name,
          email,
        });
      });
      res.json({
        message: "User updated successfully",
        data: users,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

const userDeleted = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRowCount = await models.users.destroy({
      where: {
        id,
      },
    });
    res.json({
      message: "User deleted successfully",
      count: deleteRowCount,
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  allUsers,
  userById,
  newUser,
  userUpdated,
  userDeleted,
};
