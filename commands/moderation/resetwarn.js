const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns", "rsetwarns"],
  category: "moderation",
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Du solltest über Administratorrechte verfügen, um diesen Befehl zu verwenden"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Bitte erwähne die Person, deren Warnung du zurücksetzen möchtest");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bot dürfen keine Warnungen haben!");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Du darfst deine Warnungen nicht zurücksetzen!");
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} hat keine Warnungen mehr`);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `Alle deine Warnungen werden von ${message.author.username} von ${message.guild.name} zurückgesetzt.`
    );
    await message.channel.send(
      `Alle Warnungen von ${message.mentions.users.first().username} zurückgesetzt.`
    );
  }
};
