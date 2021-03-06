const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "removemoney",
        aliases: ["rm"],
        category: "economy",
        description: "Geld von einem Benutzer leeren",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    ,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ | Du bist nicht berechtigt, Geld zu entfernen!");
        if (!args[0]) return message.channel.send("**Bitte User angeben!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Bitte gib einen gültigen Benutzer ein!**")

        if (!args[1]) return message.channel.send("**Bitte Betrag eingeben!**")
        if (isNaN(args[1])) return message.channel.send("**Bitte einen gültigen Betrag eingeben!**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**Kann nicht so viel Geld entfernen!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ | Entfernt ${args[1]} Coins\n\nNew Balance: ${bal2}`);
        message.channel.send(moneyEmbed)

    }
}