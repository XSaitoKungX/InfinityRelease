const db = require("quick.db");

module.exports = {
  name: "unmute",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Tut mir leid, aber du hast keine Berechtigung, die Stummschaltung aufzuheben!"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Ich habe keine Berechtigung zum Verwalten von Rollen.");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Bitte erwähne das Mitglied, dessen Stummschaltung du aufheben möchtest");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Der angegebene Benutzer hat keine Stummschaltung, also was soll ich machen?");
    }

    user.roles.remove(muterole)

    await message.channel.send(`**${message.mentions.users.first().username}** ist jetzt nicht mehr gestummt`);

    user.send(`Du bist jetzt nicht mehr stumm **${message.guild.name}** geschaltet`);
    
    message.delete()
  }
};
