const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "uniform",
  aliases: ["uif"],
  category: "nsfw",
  description: "Military, Konbini, Work, Nurse Uniforms, etc!~ Sexy~",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.uniform());
    return message.channel.send(akanekoSan);
      
    }
  }
}