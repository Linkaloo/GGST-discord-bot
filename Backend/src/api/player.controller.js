import db from "../../models/index";

const apiGetPlayers = async (req, res) => {
  const query = {};

  if (req.params.character) {
    query.name = req.params.character;
  }

  const list = await db.Player.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: db.Character,
      attributes: ["name", "image"],
      where: query,
    },
  });

  const response = {
    players: list,
  };
  return res.json(response);
};

const apiCreatePlayer = async (req, res) => {
  const player = req.body;
  let response;

  try {
    const character = await db.Character.findOne({ where: { name: player.character } });
    const newPlayer = await character.createPlayer(player);
    response = newPlayer;
  } catch (err) {
    response = {
      error: err,
    };
  }
  return res.json(response);
};

const apiDeletePlayer = async (req, res) => {
  let response;
  try {
    const des = await db.Player.destroy({ where: { id: req.params.id } });
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

export default { apiGetPlayers, apiCreatePlayer, apiDeletePlayer };
