import Discord from "discord.js";
import axios from "axios";

export const getPlayers = async (query) => {
  const request = await axios({
    method: "GET",
    url: `${process.env.BASE}/players`,
    data: query,
  });

  const { players } = request.data;
  const embed = new Discord.MessageEmbed();

  players.forEach((player) => {
    embed.addFields(
      { name: player.name, value: `${player.Character.name}\n[ttv/${player.name}](${player.stream})` },
    );
  });
  embed.setTitle("Players");

  return embed;
};

export const addPlayer = async (body) => {
  try {
    const request = await axios({
      method: "POST",
      url: `${process.env.BASE}/players`,
      data: body,
    });

    return request.data;
  } catch (err) {
    return err;
  }
};
