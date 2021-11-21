const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "uglybastard",
  aliases: ["uglb", "ugb"],
  category: "nsfw",
  description: "The one thing most of us can all agree to hate :)",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.uglyBastard());
    return message.channel.send(akanekoSan);
      
    }
  }
}