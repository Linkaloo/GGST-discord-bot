import Discord from "discord.js";
import * as requests from "../requests";

export const characterMoveHandler = async (message) => {
  const baseMessage = message.content.substring(message.content.indexOf("d") + 1);
  const characterName = baseMessage.split(" ").filter((s) => s !== "").join(" ");
  const embed = new Discord.MessageEmbed();

  console.log(`character name: ${characterName}`);

  if (characterName === "") {
    embed.setColor("RED");
    embed.setDescription("Enter a character name idiot");
    return embed;
  }

  const { attacks } = await requests.getCharacterFrameData(characterName);

  const frameInfo = {
    input: "",
    damage: "",
    guard: "",
    startup: "",
    active: "",
    recovery: "",
    onBlock: "",
    attackLevel: "",
  };
  let line = "";

  attacks.forEach((attack) => {
    frameInfo.input += `${attack.input}\n`;
    frameInfo.damage += `${attack.damage}\n`;
    frameInfo.guard += `${attack.guard}\n`;
    frameInfo.startup += `${attack.startup}\n`;
    frameInfo.active += `${attack.active}\n`;
    frameInfo.recovery += `${attack.recovery}\n`;
    frameInfo.onBlock += `${attack.on_block}\n`;
    frameInfo.attackLevel += `${attack.attack_level}\n`;

    line += `${attack.input}    ${attack.damage}     ${attack.guard}   ${attack.startup}       ${attack.active}      ${attack.recovery}         ${attack.on_block}     ${attack.attack_level}\n`;
  });

  embed.setTitle(attacks[0].Character.name);
  // embed.setFields(
  //   { name: "Input", value: frameInfo.input, inline: true },
  //   { name: "Damage", value: frameInfo.damage, inline: true },
  //   { name: "Guard", value: frameInfo.guard, inline: true },
  //   { name: "Startup", value: frameInfo.startup, inline: true },
  //   { name: "Active", value: frameInfo.active },
  //   { name: "Recovery", value: frameInfo.recovery, inline: true },
  //   { name: "On Block", value: frameInfo.onBlock, inline: true },
  //   { name: "Attack Level", value: frameInfo.attackLevel, inline: true },
  // );

  embed.setDescription(
    `\`\`\`Input Damage Guard Startup Active Recovery OnBlock Level\n${line}\`\`\``,
  );

  // return `**##Input Damage Guard Startup Active Recovery OnBlock AttackLevel**\n${line}`;

  return embed;
};

export const addMoveHandler = async (message) => {

};
