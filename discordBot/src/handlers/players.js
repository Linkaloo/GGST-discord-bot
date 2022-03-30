import Discord from "discord.js";
import * as requests from "../requests";

export const playerHandler = async (message) => {
  const params = message.content.split(" ");
  const query = {};

  console.log(requests);

  switch (params.length) {
    case 2: query.character = `${params[1]}`;
      break;
    case 3: query.character = `${params[1]} ${params[2]}`;
      break;
    default: break;
  }
  return requests.getPlayers(query);
};

export const addPlayerHandler = async (message) => {
  const baseMessage = message.content.substring(message.content.indexOf("r") + 2);
  const params = baseMessage.split(",").filter((s) => s !== "");
  const embed = new Discord.MessageEmbed();

  if (params.length < 3) {
    return new Discord.MessageEmbed().setDescription("Provide a name, region, character, and stream if applicable").setColor("RED");
  }

  const player = params[0].replace(/\s{2,}/g, " ");
  const region = params[1].replace(/^\s/g, "").replace(/\s{2,}/g, " ");
  const character = params[2].replace(/^\s/g, "").replace(/\s{2,}/g, " ");
  const stream = params.length > 3 ? params[3].replace(/^\s/g, "").replace(/\s{2,}/g, " ") : null;

  const body = {
    player,
    region,
    character,
    stream,
  };

  const response = await requests.addPlayer(body);

  if (response.error) {
    embed.setTitle("Error");
    embed.setDescription("Could Not Add Player");
    embed.setColor("RED");
    return embed;
  }

  console.log(response);
  embed.setTitle("Success");
  embed.setDescription(`Succesfully added player: **${response.name}**`);
  embed.setColor("GREEN");

  return embed;
};
