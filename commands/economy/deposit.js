const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "deposit",
        aliases: ["dep"],
        category: "economy",
        description: "Zahlt Geld bei der Bank ein",
        usage: "<amount>",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {

        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('RED')
                .setDescription("❌ | Du hast leider kein Geld zum Einzahlen!")

            if (!money) return message.channel.send(embedbank)

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Du hast alle deine Coins auf Ihre Bank eingezahlt`);
            message.channel.send(sembed)

        } else {

            let embed2 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Gib einen Einzahlungsbetrag an!`);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Dein Betrag ist keine Zahl!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            
            }
            let embed3 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Du kannst kein negatives Geld einzahlen!`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ | Du hast nicht so viel Geld!`);

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | Du hast ${args[0]} Coins in deine Bank hinterlegt`);

            message.channel.send(embed5)
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}