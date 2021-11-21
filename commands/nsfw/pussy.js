const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "pussy",
  aliases: [],
  category: "nsfw",
  description: "The genitals of a female, or a cat, you give the meaning.",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.pussy());
    return message.channel.send(akanekoSan);
      
    }
  }
}