const superagent = require("snekfetch");
const Discord = require('discord.js')



module.exports = {
  name: "dog",
  category: "fun",
description: "Sendet ein zufälliges Hundebild",
usage: "[command]",
run: async (client, message, args) => {
//command
superagent.get('https://nekos.life/api/v2/img/woof')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Random Dog")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`🤣WAS FÜRN HUND🤣`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};