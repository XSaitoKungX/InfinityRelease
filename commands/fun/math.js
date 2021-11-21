const { MessageEmbed } = require("discord.js");
const math = require("mathjs");
const Color = `RANDOM`;

module.exports = {
  name: "math",
  category: "fun",
  run: async (client, message, args) => {
    try {
      if (!args[0]) return message.channel.send("Bitte gib mir eine Gleichung!");

      const embed = new MessageEmbed()
        .setColor(`${Color}`)
        .setTitle(`Result`)
        .setDescription(math.evaluate(args.join(" ")))
        .setTimestamp();

      message.channel.send(embed);
    } catch (error) {
      message.channel.send(`Bitte gib mir eine gültige Gleichung | Versuche es später noch einmal!`).then(() => console.log(error));
    }
  }
};