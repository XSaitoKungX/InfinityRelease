const discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(`Pong - ${client.ws.ping}ms`)
    .setColor("RANDOM")
    .setFooter(`Angefördert von: ${message.author.username}`)
    .setTimestamp()
    
    message.channel.send(embed)
  }
}