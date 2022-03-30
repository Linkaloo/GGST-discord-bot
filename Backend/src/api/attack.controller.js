import db from "../../models/index";

const apiGetAttacks = async (req, res) => {
  const characterQuery = {};
  const attackQuery = {};

  console.log(req.params);
  console.log(req.query);
  if (req.params.character) {
    characterQuery.name = req.params.character;
  }

  if (req.params.input) {
    attackQuery.input = req.params.input;
  }

  const list = await db.Attack.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "character_id"],
    },
    include: {
      model: db.Character,
      attributes: ["name"],
      where: characterQuery,
    },
    where: attackQuery,
  });

  const response = {
    attacks: list,
  };
  return res.json(response);
};

const apiCreateAttack = async (req, res) => {
  const attack = req.body;
  let response;

  try {
    const character = await db.Character.findOne({ where: { name: attack.character } });
    const newAttack = await character.createAttack(attack);
    response = newAttack;
  } catch (err) {
    response = {
      error: err,
    };
  }

  return res.json(response);
};

const apiDeleteAttack = async (req, res) => {
  let response;
  try {
    const des = await db.Attack.destroy({ where: { id: req.params.id } });
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

export default { apiGetAttacks, apiCreateAttack, apiDeleteAttack };
