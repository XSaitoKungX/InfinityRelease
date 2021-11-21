const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "doujin",
  aliases: [],
  category: "nsfw",
  description: "Sends a random doujin page imageURL!",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.doujin());
    return message.channel.send(akanekoSan);
      
    }
  }
}