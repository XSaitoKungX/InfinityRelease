const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "bdsm",
  aliases: [],
  category: "nsfw",
  description: "Get some wallpapers",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.bdsm());
    return message.channel.send(akanekoSan);
      
    }
  }
}