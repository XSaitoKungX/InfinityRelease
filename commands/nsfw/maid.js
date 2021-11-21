const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "maid",
  aliases: [],
  category: "nsfw",
  description: "Maids, Maid Uniforms, etc, you know what maids are :3",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("Dieser Kanal unterstützt keine NSFW-Inhalte!")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.maid());
    return message.channel.send(akanekoSan);
      
    }
  }
}