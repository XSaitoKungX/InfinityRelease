const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "cum",
  aliases: [],
  category: "nsfw",
  description: "Basically sticky white stuff that is usually milked from sharpies.",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.cum());
    return message.channel.send(akanekoSan);
      
    }
  }
}