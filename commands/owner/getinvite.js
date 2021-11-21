const ownerid = "848917797501141052";

module.exports = {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Erzeugt eine Einladung an den betreffenden Server.",
        usage: "[ID | name]",
      
    run: async(bot, message, args) => {
        if (message.author.id === ownerid) {
        let guild = null;

        if (!args[0]) return message.channel.send("Gib den Servernamen oder die Server-ID des gewünschten Einladungslinks ein.")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("Das ist der ungültige Servername");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" 
            && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Tut mir leid, ich habe dort keine CREATE_INSTANT_INVITE-Berechtigung!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} ist aufgetreten!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - Ich bin nicht auf diesem Server.`);
        }
    } else {
        return;
    }
    }

}