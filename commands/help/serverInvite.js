const discord = require("discord.js");

module.exports = {
  name: "serverinvite",
  aliases: ["serverinv", "srinv"],
  category: "info",
  description: "INVITE Automodv12 beta BOT",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`HERE INVITE LINK OF BOT`)
    .setDescription(`[CLICK HERE](https://dsc.gg/infinity.net) OR [Support Server ](https://dsc.gg/infinity-support)`)
    .setColor("RANDOM")
    .setFooter(`Erstellt mit ❤ von XSaitoKungX `)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel .send(embed);
    
  },
};