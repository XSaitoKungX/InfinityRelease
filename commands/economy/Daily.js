const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    
        name: "daily",
        aliases: ["coins-system", "dl"],
        category: "economy",
        description: "Gibt dir 200 Coins pro Tag",
        usage: " ",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Du hast deine tägliche Belohnung bereits geholt\n\nHol es dir wieder in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Du bekommst deine tägliche Belohnung. Das Geld wird automatisch auf deinem Konto überwiesen. Summe: ${amount} Coins.`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}