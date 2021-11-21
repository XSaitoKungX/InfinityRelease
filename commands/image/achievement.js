const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "achievement",
  description: "Gives you an achievment",
  aliases: ["ach"],
  category: "Image",
  run: async (client, message, args) => {
    const text = args.join("+");
    const e = new MessageEmbed()
      .setTitle("Glückwunsch, du hast **New Achievement** freigeschaltet!!! :tada:")
      .setImage(
        `https://minecraftskinstealer.com/achievement/11/Achievement+Get%21/${text}`
      );
    message.channel.send(e);
  },
};