const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
 
    name: "pay",
    noalias: [""],
    category: "economy",
    description: "Geld an deinen Freunden spenden",
    usage: "[mention | ID] <amount>",
    accessableby: "everyone"
  ,
  run: async (bot, message, args) => {
try {
  let user2 = message.author
    if (!args[0]) return message.channel.send("**Bitte User angeben!**");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**Bitte einen gültigen Benutzer eingeben!**");

    let member = db.fetch(`money_${user2.id}`);

    let embed1 = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ | Erwähne jemanden, den du Geld geben möchtest`);

    if (!args[0]) {
      return message.channel.send(embed1);
    }
    let embed2 = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ | Du kannst kein Geld an dich selbst geben!`);

    if (user.user.id === message.author.id) {
      return message.channel.send(embed2);
    }

    let embed3 = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ | Gib einen zu gegebenen Betrag an!`);

    if (!args[1]) {
      return message.channel.send(embed3);
    }
    let embed4 = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ | Gib einen gültigen Betrag ein!`);

    if (isNaN(args[1])) {
      return message.channel.send(embed4);
    }
    let embed5 = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ | Du hast nicht so viel Geld!`);

    if (member < args[1]) {
      return message.channel.send(embed5);
    }

    let embed6 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ | Du hast ${user.displayName} ${args[1]} Coins gegeben.`);

    message.channel.send(embed6);
    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${user2.id}`, args[1]);
    } catch {
        
    }
  }
};