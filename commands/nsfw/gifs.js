const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "gifs",
  aliases: [],
  category: "nsfw",
  description: "Basically an animated image, so yes :3",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.gifs());
    return message.channel.send(akanekoSan);
      
    }
  }
}