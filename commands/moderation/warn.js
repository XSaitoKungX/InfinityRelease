const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Du solltest über Administratorrechte verfügen, um diesen Befehl zu verwenden!"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Bitte erwähne die Person, die du warnen möchtest - warn @mention <reason>"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Du kannst Bots nicht warnen!");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Du kannst dich selbst nicht warnen!");
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "Du wichser, wie kann man den Serverbesitzer warnen?? -_-"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Bitte gib einen Grund zur Warnung an - warn @mention <reason>"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `Du wurdest gewarnt in **${message.guild.name}**! Grund: ${reason}`
      );
      await message.channel.send(
        `You warned **${
          message.mentions.users.first().username
        }** for ${reason}`
      );
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(`Du wurdest gewarnt in **${message.guild.name}**! Grund: ${reason}`);
      
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`);
      
      message.delete
      
    }
  }
};
