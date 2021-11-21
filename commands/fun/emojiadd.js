const Discord = require("discord.js");
const { parse } = require("twemoji-parser");


module.exports = {
  name: "emojiadd",
  aliases: ['stealemoji', 'semot', 'aemo'],
  category: "moderation",
  usage: "stealemoji <emoji> <custom name>",
  description: "Steal an emoji from a different server",
  botPermissions: ["MANAGE_EMOJIS"],
  memberPermissions: ["MANAGE_EMOJIS"],
  async execute(bot, message, args) {
    const emoji = args[0];
    if (!emoji) return message.channel.send("Bitte gib mir ein Emoji!");

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");

      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = BaseEmbed(message)
        .setTitle("Emoji Added")
        .setColor("RANDOM")
        .setDescription(
          `Emoji wurde erfolgreich hinzugefügt! | Name : ${
            name || `${customemoji.name}`
          } | Preview : [Click Me](${Link})`
        );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send("Bitte gib mir ein gültiges Emoji!");
      message.channel.send(
        "You Can Use Normal Emoji Without Adding In Server!"
      );
    }
  },
};