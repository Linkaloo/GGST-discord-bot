import Discord from "discord.js";
import * as requests from "../requests";

export const characterHandler = async (message) => {
  const { characters } = await requests.getCharacters({});
  const embed = new Discord.MessageEmbed();
  let description = "";

  characters.forEach((character) => {
    description += `${character.name}\n`;
  });

  embed.setTitle("Characters");
  embed.setDescription(description);
  embed.setColor("GREEN");
  return { embeds: [embed] };
};

export const addCharacterHandler = async (message) => {
  const baseMessage = message.content.substring(message.content.indexOf(" ") + 1);
  const params = baseMessage.split(",").filter((s) => s !== "");
  const embed = new Discord.MessageEmbed();

  if (params.length < 2) {
    return new Discord.MessageEmbed().setDescription("Provide the character name and optionally an image url").setColor("RED");
  }

  const characterName = params[0].replace(/\s{2,}/g, " ");
  const characterImage = params[1].replace(/^\s/g, "").replace(/\s{2,}/g, " ");

  const body = {
    name: characterName,
    image: characterImage,
  };

  const response = await requests.addCharacter(body);

  if (response.error) {
    embed.setTitle("Error");
    embed.setDescription("Could not add character or character already exists");
    embed.setColor("RED");
    return { embeds: [embed] };
  }

  embed.setTitle("Success");
  embed.setDescription(`Succesfully added character: **${response.name}**`);
  embed.setColor("GREEN");

  return { embeds: [embed] };
};
