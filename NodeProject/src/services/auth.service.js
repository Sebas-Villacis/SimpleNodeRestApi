const { generateJWT } = require("../helpers/jwt");
const models = require("../models");

const authLogin = async (req, res) => {
  const { email, name } = req.body;
  try {
    //verifyEmail
    const user = await models.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Email is not valid",
      });
    }
    // Generate Token

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Contact your administrator",
    });
  }
};

module.exports = { authLogin };
