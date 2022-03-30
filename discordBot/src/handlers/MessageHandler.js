import Discord from "discord.js";
import * as constants from "../constants";
import * as ggst from "./ggstHandler";

const commandHandler = async (message) => {
  const command = message.content.split(" ")[0].trim();
  switch (command) {
    case "!help": console.log("help");
      break;
    case "!players": return ggst.playerHandler(message);
    case "!addplayer": return ggst.addPlayerHandler(message);
    case "!characters": return ggst.characterHandler(message);
    case "!addcharcter": return ggst.addCharacterHandler(message);
    case "!fd": return ggst.characterMoveHandler(message);
    case "!addfd": return ggst.addMoveHandler(message);
    default: break;
  }

  return undefined;
};

const sendMessage = async (channel, message) => {
  channel.send({ embeds: [message] });
  // channel.send(message);
};

const processMessage = async (message) => {
  // check for command
  const commandString = message.content.split(" ")[0].trim();
  let newMessage;
  if (constants.commands[commandString] !== undefined) {
    newMessage = await commandHandler(message);
  }

  // send message
  if (newMessage) { await sendMessage(message.channel, newMessage); }
};

const Handler = async (message) => {
  await processMessage(message);
};

export default { Handler };
