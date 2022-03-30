import Discord from "discord.js";
import axios from "axios";

export const getCharacters = async (query) => {
  const request = await axios({
    method: "GET",
    url: `${process.env.BASE}/characters`,
    data: query,
  });

  // const { characters } = request.data;
  // const embed = new Discord.MessageEmbed();
  // let description = "";

  // characters.forEach((character) => {
  //   description += `${character.name}\n`;
  // });

  // embed.setTitle("Characters");
  // embed.setDescription(description);
  // return embed;
};

export const addCharacter = async (query) => {
};
