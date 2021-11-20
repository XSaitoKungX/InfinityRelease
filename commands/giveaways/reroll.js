const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
  name: "reroll",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category:"giveaway",
    run: async (bot, message, args) => {
       if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: | Du benötigst die Berechtigung zum Verwalten von Nachrichten, um Giveaways erneut zu rollen.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: | Du musst eine gültige Nachrichten-ID angeben!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Kein Giveaway für `'+ args.join(' ') +'` gefunden.');
    }

    // Reroll the giveaway
    bot.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Gewinnspiel neu aufgerollt!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('Dieses Gewinnspiel ist noch nicht beendet!');
        } else {
            console.error(e);
            message.channel.send('Es ist ein Fehler aufgetreten...');
        }
    });

    }
}