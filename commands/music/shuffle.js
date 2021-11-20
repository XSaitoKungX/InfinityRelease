const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'shuffle', // Optional
    aliases: ['sh'], // Optional
    category: 'Music',
    description: 'Shuffle the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if (!voice_channel) return message.channel.send(embed);
            let songs = client.player.shuffle(message);
            const shuffle = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription('Server Queue wurde erfolgreich vermischt.')
            if(songs)
            message.channel.send(shuffle);
    }
}