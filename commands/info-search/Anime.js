const Discord = require("discord.js");

const malScraper = require('mal-scraper');


module.exports = {
  name: "anime",
  category: "search",
  description: "Get info about an anime",
  usage: "[command | Anime]",
  run: async (client, message, args) => {
    //command
    const search = `${args}`;
    if (!search)
      return message.reply('Bitte füge eine Suchanfrage hinzu!');

    malScraper.getInfoFromName(search)
      .then((data) => {
        const malEmbed = new Discord.MessageEmbed()
          .setAuthor(`Meine Anime-Liste Suchergebnis für ${args}`.split(',').join(' '))
          .setThumbnail(data.picture)
          .setColor('RANDOM') //What ever u want color!
          .addField('Premiered', `\`${data.premiered}\``, true)
          .addField('Broadcast', `\`${data.broadcast}\``, true)
          .addField('Genres', `\`${data.genres}\``, true)
          .addField('Englischer Titel', `\`${data.englishTitle}\``, true)
          .addField('Japanischer Titel', `\`${data.japaneseTitle}\``, true)
          .addField('Type', `\`${data.type}\``, true)
          .addField('Episodes', `\`${data.episodes}\``, true)
          .addField('Bewertung', `\`${data.rating}\``, true)
          .addField('Ausgestrahlt', `\`${data.aired}\``, true)
          .addField('Score', `\`${data.score}\``, true)
          .addField('Favorite', `\`${data.favorites}\``, true)
          .addField('Rang', `\`${data.ranked}\``, true)
          .addField('Dauer', `\`${data.duration}\``, true)
          .addField('Studios', `\`${data.studios}\``, true)
          .addField('Popularität', `\`${data.popularity}\``, true)
          .addField('Members', `\`${data.members}\``, true)
          .addField('Score-Statistiken', `\`${data.scoreStats}\``, true)
          .addField('Source', `\`${data.source}\``, true)
          .addField('Synonyms', `\`${data.synonyms}\``, true)
          .addField('Status', `\`${data.status}\``, true)
          .addField('Identifier', `\`${data.id}\``, true)
          .addField('Link', data.url, true)
          .setTimestamp()
          .setFooter(`Angefordert von: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(malEmbed);

      })
  }
};
