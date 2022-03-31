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
  const { params } = req;
  try {
    const des = await db.Player.destroy({ where: { name: params.player } });
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

const apiUpdatePlayer = async (req, res) => {
  const update = req.body;
  let response;

  if (update.character) {
    try {
      const newCharacter = await db.Character.findOne({ where: { name: update.character } });
      update.character_id = newCharacter.id;
    } catch (err) {
      response = {
        error: "Character not found",
        character: update.character,
      };
      return res.json(response);
    }
  }

  try {
    const updatedPlayer = await db.Player.update(
      update,
      {
        where: {
          name: update.current,
        },
      },
    );

    response = {
      updated: updatedPlayer[0] === 1,
      player: update.name,
      character: update.character_id ? update.character : undefined,
    };
  } catch (err) {
    response = {
      error: err,
    };
  }
  return res.json(response);
};

export default {
  apiGetPlayers, apiCreatePlayer, apiDeletePlayer, apiUpdatePlayer,
};
