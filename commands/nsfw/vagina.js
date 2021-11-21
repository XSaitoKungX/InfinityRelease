const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "vagina",
  aliases: [],
  category: "nsfw",
  description: "Get some Wallpaper",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.vagina());
    return message.channel.send(akanekoSan);
      
    }
  }
}