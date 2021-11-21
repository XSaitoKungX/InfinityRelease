const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "feet",
  aliases: [],
  category: "nsfw",
  description: "So you like smelly feet huh?",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.feet());
    return message.channel.send(akanekoSan);
      
    }
  }
}