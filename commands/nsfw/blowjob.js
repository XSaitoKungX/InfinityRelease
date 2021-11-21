const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "blowjob",
  aliases: ["blj"],
  category: "nsfw",
  description: "Basically an image of a girl sucking on a sharp blade!.",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.blowjob());
    return message.channel.send(akanekoSan);
      
    }
  }
}