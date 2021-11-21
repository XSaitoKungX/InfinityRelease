const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setsuggest",
    aliases: ["sets"],
    category: "suggestion",
    usage: "setsuggest <#channel>",
    authorPermission: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`Du bist nicht berechtigt, diesen Befehl zu verwenden! Server verwalten`)
        }
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Bitte erwähne einen Kanal!`);

        if (Channel.type === "voice") return message.channel.send(`Bitte erwähne einen Textkanal!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Vorschlagskanal ist eingestellt als <#${Channel.id}>`)
        .setTimestamp()
        .setThumbnail("https://cdn2.vectorstock.com/i/1000x1000/47/41/video-game-controller-with-wings-icon-logo-vector-26374741.jpg")

        return message.channel.send(Embed);

    }
};