const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
   
        name: "addmoney",
        aliases: ["am"],
        category: "economy",
        description: "Geld an einem Benutzer hinzufügen",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    ,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ | Du bist nicht berechtigt, Geld hinzuzufügen! - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**Bitte einen Benutzer eingeben!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) 
        || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Gib einen gültigen Benutzer ein!**")
        if (!args[1]) return message.channel.send("**Bitte Betrag eingeben!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ | Dein Betrag ist keine Zahl!**`);
        if (args[0] > 10000) return message.channel.send("**Kann nicht so viel hinzufügen!**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`✅ | Added ${args[1]} coins\n\nNew Balance: ${bal}`);
        message.channel.send(moneyEmbed)

    }
}