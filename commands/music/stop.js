const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'stop', // Optional
    category: 'Music',
    description: 'Clears the queue and leave the vc', 
    aliases: ['st'], // Optional
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if (!voice_channel) return message.channel.send(embed);
            let isDone = client.player.stop(message);
            const stop = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription('Die Musik wurde gestoppt und die Warteschlange wurde gelöscht!')
            if(isDone)
            message.channel.send(stop);
    }
}