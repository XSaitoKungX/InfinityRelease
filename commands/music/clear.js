const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear', // Optional
    aliases: ['clearqueue', 'clear-queue'], // Optional
    category: 'Music',
    description: 'Clears the queue', 
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new MessageEmbed()
        .setColor('#FF5757')
        .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
        const embed1 = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Warteschlange wurde gelöscht!')
        if (!voice_channel) return message.channel.send(embed);
        let isDone = client.player.clearQueue(message);
        if(isDone)
            message.channel.send(embed1);
    }
}