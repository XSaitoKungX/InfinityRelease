const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "addrole",
  aliases: ["role", "qrole"],
  category: "moderation",
  description: "Add role to any user",
run: async (bot, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(
            "**Du hast nicht die Berechtigung, Benutzern Rollen hinzuzufügen! - [MANAGE_ROLES]**");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(
            "**Ich habe nicht die Berechtigung, Benutzern Rollen hinzuzufügen! - [MANAGE_ROLES]**");
        
        if (!args[0]) return message.channel.send("**Bitte gib eine Rolle ein!**")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(
            args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) 
            || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.channel.send("**Bitte gib einen Benutzernamen ein!**");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot Add Role To This User!**')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) 
        || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("**Bitte gib eine Rolle ein!**")

        if (!role) return message.channel.send("**Diese Rolle konnte nicht gefunden werden!**")

        if (role.managed) return message.channel.send("**Diese Rolle kann dem Benutzer nicht hinzugefügt werden!**")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(
            '**Die Rolle ist derzeit höher als ich, daher kann sie dem Benutzer nicht hinzugefügt werden!**')

        if (rMember.roles.cache.has(role.id)) return message.channel.send("**User Already Has The Role!**")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`Rolle wurde erfolgreich zu ${rMember.user.username} hinzugefügt :tada:`)
        message.channel.send(sembed)

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "addrole")
            .addField("**Added Role to**", rMember.user.username)
            .addField("**Role Added**", role.name)
            .addField("**Added By**", message.author.username)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

        let sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
};