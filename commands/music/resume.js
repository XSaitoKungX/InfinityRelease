const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'resume', // Optional
    aliases: ['resume'], // Optional
    category: 'Music',
    description: 'Resume the song that was paused', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if (!voice_channel) return message.channel.send(embed);
            let song = client.player.resume(message);
            const resume = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`**${song.name}** wurde wieder abgespielt`)
            if(song)
            message.channel.send(resume);
    }
}