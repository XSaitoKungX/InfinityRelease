const discord = require("discord.js");
module.exports = {
  name: "bug",
  category: "moderation",
  args: true,
  description:
    "Bitte den Fehler angeben. Beispiel:\n`Punch funktioniert nicht. Es wird nicht der Benutzer erwähnt, den ich versuche zu schlagen`",
  usage:
    "Bitte den Fehler angeben. Beispiel:\n`Punch funktioniert nicht. Es wird nicht der Benutzer erwähnt, den ich versuche zu schlagen`",
  run: async (client, message, args) => {
    // again make this fit your command handler style 😀
    args = args.join(" ");
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    message.reply(
      "Vielen Dank für das Einreichen eines Fehlers!, wir werden deinen Bericht überprüfen\nWir werden dir eine DM schicken, wenn dieser Fehler behoben ist\nWir bitten auch daher alle DM-Berechtigungen zu aktivieren"
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : ${message.author.username}`
      })
      .then(InviteCode =>
        client.channels.cache.get("911607446345236510").send(
          new discord.MessageEmbed()
            .setTitle("New Report Bug")
            .addField(
              "User Name",
              `**${message.author.username}#${message.author.discriminator}**`
            )
            .addField("ID User", message.author.id)
            .addField("Reported", args)
            .addField("Server Name", `**${message.guild.name}**`)
            .addField("ID Server", `**${message.guild.id}**`)
            .addField("USER SEARCH", `**[Click Here](https://discordapp.com/users/${message.guild.id}/)**`)
            .addField(`Link Server`, `https://discord.gg/${InviteCode.code}`)
            .setColor("RANDOM")
        )
      );
  }
};