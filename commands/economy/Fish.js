const fishes = require('../../JSON/fishes.json');
let db = require('quick.db');
const ms = require("parse-ms");
const { randomRange } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
        name: 'fish',
        aliases: ['catchfish'],
        category: 'economy',
        description: 'Fange einen Fisch aus einem riesigen Ozean',
        usage: '[list | rewards] (optional)',
        acessableby: 'everyone'
    ,
    run: async (bot, message, args) => {

        let user = message.author;

        let bal = db.fetch(`money_${user.id}`)
   
        let fish = await db.fetch(`fish_${user.id}`)
        if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;

            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishID < 5) rarity = 'junk';
            else if (fishID < 8) rarity = 'common';
            else if (fishID < 9) rarity = 'uncommon';
            else if (fishID < 10) rarity = 'rare';
            else rarity = 'legendary';
            const fishh = fishes[rarity];
            const worth = randomRange(fishh.min, fishh.max);

            let timeout = 1800000;
            let fishtime = await db.fetch(`fishtime_${user.id}`);

            if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
                let time = ms(timeout - (Date.now() - fishtime));

                let timeEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ | Du hast kürzlich eine Linie gecastet\n\nFisch wieder in ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)
            }

            let embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**🎣 | Du hast deine Leitung ausgeworfen und hat ${fishh.symbol} erwischt! Ich wette, es würde sich für ungefähr ${worth} verkaufen**!`)
            message.channel.send(embed);

            db.add(`money_${user.id}`, worth);
            db.add(`fish_${user.id}`, 1);
            db.set(`fishtime_${user.id}`, Date.now())
        }
        if (args[0] === 'list' || args[0] === 'rewards') {

            let lEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Liste der Fischnamen und Belohnungen, die du bekommen kannst`)
                .setDescription(`
\`\`\`🔧Junk      :: Maximale Belohnung: 5, Mindestbelohnung: 1
🐟Common    :: Maximale Belohnung: 25, Mindestbelohnung: 10
🐠Uncommon  :: Maximale Belohnung: 50, Mindestbelohnung: 18
🦑Rare      :: Maximale Belohnung: 75, Mindestbelohnung: 30
🐋Legendary :: Maximale Belohnung: 100, Mindestbelohnung: 50\`\`\`
**Alle Belohnungen sind zufällig von max/min**
​
`)
                .setFooter(message.guild.name, message.guild.iconURL())
            return message.channel.send(lEmbed);
        }
    }
}