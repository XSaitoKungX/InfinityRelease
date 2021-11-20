const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { default_prefix } = require('../../config');

module.exports = {
    
        name: "buy",
        noalias: [""],
        category: "economy",
        description: "buys items",
        usage: "[item]",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let user = message.author;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = default_prefix
        } else {
            prefix = fetched
        }
      
        let author = db.fetch(`money_${user.id}`)

        let Embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ | Du benötigst 200 Coinst, um Bronze VIP zu kaufen!`);


        if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            if (author < 200) return message.channel.send(Embed)

            await db.fetch(`bronze_${user.id}`);
            db.set(`bronze_${user.id}`, true)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Bronze VIP für 200 Coins gekauft`);

            db.subtract(`money_${user.id}`, 200)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ | Du brauchst 600 Coins, um ein paar Nikes zu kaufen!`);

            if (author < 600) return message.channel.send(Embed3)

            await db.fetch(`nikes_${user.id}`)
            db.add(`nikes_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Neue frische Nikes für 600 Coins gekauft.`);

            db.subtract(`money_${user.id}`, 600)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ | Du benötigst 800 Coins, um ein neues Auto zu kaufen!`);

            if (author < 800) return message.channel.send(Embed5)

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Ein neues Auto für 800 Coins gekauft.`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ | Du brauchst 1200 Coins, um ein Herrenhaus zu kaufen`);

            if (author < 1200) return message.channel.send(Embed7)

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Ein Herrenhaus für 1200 Coins gekauft`);

            db.subtract(`money_${user.id}`, 1200)
            message.channel.send(Embed8)
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ | Gib einen Artikel zum Kaufen ein!\nType ${prefix}shop, um Items Liste zu sehen.`)
                return message.channel.send(embed9)
            }
        }
    }
}