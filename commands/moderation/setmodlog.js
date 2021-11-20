const db = require("quick.db")

module.exports = {
  name: "setmodlog",
  description: "set mod log cgannel",
  category: "moderation",

 run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) 
        return message.channel.send("**Du hast nicht die erforderlichen Berechtigungen! - [ADMINISTRATOR]**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Modlog-Channel-Set in diesem Server: \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Bitte gib einen Kanalnamen oder eine ID zum Einstellen ein!**"
        );
    }
        let channel = message.mentions.channels.first() 
        || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) 
        || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**Bitte gib einen gültigen Textkanal ein!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**Dieser Kanal ist bereits als Modlog-Kanal eingestellt!**")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Modlog-Kanalset!**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`**Modlog-Kanal wurde erfolgreich eingerichtet in \`${channel.name}\`!**`)
            }
        } catch {
            return message.channel.send("**Error - `Fehlende Berechtigungen oder Kanal ist kein Textkanal!`**");
        }
    }
};