const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")

module.exports = {
    name: "github",
    aliases: ["git"],
    category: "search",
    usage: "Github <Name>",
    exmaple: "Github Emoji",
    description: `Github User Account Information!`,
    run: async (client, message, args) => {

       try {

  if (!args[0]) return message.channel.send(`Please Give Me A Username!`)
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`Benutzer wurde nicht gefunden | Bitte gib mir einen gültigen Benutzernamen!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login} Information!`, avatar_url)
            .setColor(`#211F1F`)
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "No Bio"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "No Location"}`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setFooter(`Tysm For Using Me! ${message.author.username}`)

            message.channel.send(embed)

    })

        } catch (error) {
            console.log(`[Commands] [github] Fehler im github-Befehl erhalten :\n`, error);
            return message.channel.send(`Etwas ist schief gelaufen. Versuche es später noch einmal!`)
        }
    }
};