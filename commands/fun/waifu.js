const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "waifu",
  aliases: ["wa"],
  category: "fun",
  description: "Waifu",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first()
    
    let data = await random.getAnimeImgURL("waifu");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${target.user.username} is now ${message.author.username}\'s Waifu >.<`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};