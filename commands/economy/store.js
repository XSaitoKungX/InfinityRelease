const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../../config');
const db = require('quick.db');

module.exports = {
   
        name: "shop",
        aliases: ["store"],
        category: "economy",
        description: "Zeig Shop-Liste an",
        usage: " ",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
let g = [1 , 2, 3, 4, null]
        if (fetched === null) {
            prefix = default_prefix
        } else {
            prefix = fetched
        }
 

     let embed = new MessageEmbed()
            .setDescription(`** SHOP: **\n PadLock: \`500$\`\n Du kannst ein Vorhängeschloss verwenden, um deine Brieftasche zu schützen [${prefix}buy/${prefix}sell PadLock]\n\n LapTop: \`800$\`
 Du kannst einen Laptop verwenden, um online Geld zu verdienen 💰
[${prefix}buy/${prefix}sell Laptop] \n\nFishing Rod: \`1600$\` 
 Du kannst ein paar Fische kaufen und etwas Geld verdienen. 
[${prefix}buy/${prefix}sell Fishing Rod]\n\nHunting Rifle: \`2000$\`
 Mit Jagdgewehr kann man Tiere fangen und Geld verdienen. [${prefix}buy/${prefix}sell Hunting Rifle]\n\nBank Note: \`2600$\`
 Du kannst den Speicher deiner Bank auf 100 bis 5000 erhöhen. [${prefix}buy/${prefix}sell Bank Note]
 `)
            .setColor("RANDOM")
            .setFooter(`Angefordert von: ${message.author.username}`)
            .setTimestamp()
            .setThumbnail('https://media.istockphoto.com/vectors/one-stop-shop-neon-sign-vector-shoping-design-template-light-banner-vector-id1248210644?k=20&m=1248210644&s=170667a&w=0&h=q7v2ic677NBiAP6HPTn5vhsTd3qKYcuZPHQeQSoDh5Q=')
        message.channel.send(embed)
      if(args[0] === "2"){
        
        }
    }
}