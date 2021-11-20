const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["mutes", "muted"],
  category: "moderation",
  description: "muet",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Tut mir leid, du brauchst die Berechtigung, jemanden stumm zu schalten!");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Ich habe keine Berechtigung zum Stummschalten!");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("\```bitte erwähne die Mitglieder für stumm\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("Ich kann dich nicht stumm schalten, weil du der Autor der Nachricht bist!");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send(" \``` Bitte gib einen Grund für die Stummschaltung an\``` ");
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "muted");

    if (!muterole) {
      return message.channel.send("\```Bitte Rollennamen mit stumm erstellen \``` ");
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

    await message.channel.send(
      `Du hast ${message.mentions.users.first().username} stummgeschaltet. Grund: ${reason}`
    );

    user.send(`Du wurdest in ${message.guild} stummgeschaltet. Grund: ${reason}`
    );
  }
};
