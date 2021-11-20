const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'nowplaying', // Optional
    aliases: ['np'], // Optional
    category: 'Music',
    description: 'Gibt Informationen über das Lied, das gerade gespielt wird, und den Fortschritt davon', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if (!voice_channel) return message.channel.send(embed);
            let progressBar = client.player.createProgressBar(message, {
                size: 20,
                block: '▬',
                arrow: '🔘'
            
            });
            let song = await client.player.nowPlaying(message)
            const bar = new MessageEmbed()
            .setColor('#85b0d2')
            .setTitle(`${song.name}`)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(`⋆ Requested by ${message.author}
            \`${progressBar}\``)

            if(progressBar)

                message.channel.send(bar);
    }
}