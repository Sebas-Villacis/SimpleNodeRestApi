const models = require("../models");

const allHospitals = async (req, res) => {
  try {
    const hospitals = await models.hospitals.findAll();
    res.json({
      ok: true,
      hospitals,
    });
  } catch (e) {
    console.log(e);
  }
};

const newHospital = async (req, res = response) => {
  const { name } = req.body;
  const nameExists = await models.hospitals.findOne({
    where: {
      name,
    },
  });

  if (nameExists) {
    return res.status(400).json({
      msg: "The name is already registered",
    });
  }
  const newHospital = await models.hospitals.create(
    {
      name,
    },
    {
      fields: ["name"],
    }
  );

  try {
    if (newHospital) {
      return res.json({
        msg: "Hospiatl created successfully",
        data: newHospital,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact your administrator",
    });
  }
};

const hospitalUpdated = async (req, res = response) => {
  const { id,name } = req.params;
  console.log(id);

  try {
    const hospital = await models.hospitals.findByPk(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital not found by id",
      });
    }

    const updatehospital = await models.hospitals.update(
      { name:name},
      {
        where: {
        id
      }}
    )

    res.json({
      ok: true,
      hospital: updatehospital,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const hospitalDeleted = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospital = await models.hospitals.findByPk(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: "Hospital not found by id",
      });
    }

    await models.hospitals.destroy({
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: "Hospital deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Contact your administrator",
    });
  }
};

module.exports = {
  allHospitals,
  newHospital,
  hospitalUpdated,
  hospitalDeleted,
};
