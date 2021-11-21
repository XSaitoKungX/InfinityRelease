const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { default_prefix } = require('../../config');

module.exports = {
    
        name: "buy",
        noalias: [""],
        category: "economy",
        description: "Sachen im Shop kaufen",
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
            .setColor("RED")
            .setDescription(`❌ | Du benötigst 200 Coinst, um Bronze - VIP zu kaufen!`);


        if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            if (author < 500) return message.channel.send(Embed)

            await db.fetch(`bronze_${user.id}`);
            db.set(`bronze_${user.id}`, true)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Bronze - VIP für 500 Coins gekauft`)
                .setThumbnail("https://cdn.dribbble.com/users/765195/screenshots/7021533/bronze_1600_4x.png");

            db.subtract(`money_${user.id}`, 500)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let Embed3 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Du brauchst 2.350 Coins, um ein paar Nikes zu kaufen!`);

            if (author < 2350) return message.channel.send(Embed3)

            await db.fetch(`nikes_${user.id}`)
            db.add(`nikes_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Neue frische Nikes für 600 Coins gekauft.`)
                .setThumbnail('https://i.pinimg.com/474x/5b/a8/ef/5ba8efef1ee6401dff5df1d0a4c150fe--typography-served-advertising-design.jpg');

            db.subtract(`money_${user.id}`, 2350)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Du benötigst 4.500.000 Coins, um ein Ferrari Daytona SP3 zu kaufen!`);

            if (author < 4500000) return message.channel.send(Embed5)

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Ein neues Auto für 4.500.000 Coins gekauft.`)
                .setThumbnail("https://s3-prod-europe.autonews.com/s3fs-public/Ferrari%20Daytona%20SP3.jpg");

            db.subtract(`money_${message.guild.id}_${user.id}`, 4500000)
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Du brauchst 5.975.000 Coins, um ein Herrenhaus zu kaufen!`);

            if (author < 5975000) return message.channel.send(Embed7)

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Ein Herrenhaus für 5.975.000 Coins gekauft`)
                .setThumbnail('https://i.ytimg.com/vi/o-OegG1u4ug/maxresdefault.jpg');

            db.subtract(`money_${user.id}`, 5975000)
            message.channel.send(Embed8)
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ | Gib einen Artikel zum Kaufen ein!\nType ${prefix}shop, um Items Liste zu sehen.`)
                return message.channel.send(embed9)
            }
        }
    }
}