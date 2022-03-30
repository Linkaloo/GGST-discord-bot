import db from "../../models/index";

const apiGetCharacters = async (req, res) => {
  const list = await db.Character.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  const response = {
    characters: list,
  };
  return res.json(response);
};

const apiCreateCharacter = async (req, res) => {
  const character = req.body;
  let response;
  try {
    const newCharacter = await db.Character.create(character);
    response = newCharacter;
  } catch (err) {
    response = {
      error: err,
    };
  }

  return res.json(response);
};

const apiDeleteCharacter = async (req, res) => {
  let response;
  try {
    const des = await db.Character.destroy({ where: { id: req.params.id } });
    response = {
      total_deleted: des,
    };
  } catch (err) {
    response = {
      error: err,
    };
  }
  return res.json(response);
};

export default { apiGetCharacters, apiCreateCharacter, apiDeleteCharacter };
