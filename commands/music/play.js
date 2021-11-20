const { MessageEmbed } = require("discord.js");
const ytsr = require('ytsr');
module.exports = {
    name: 'play',
    aliases: ['p'], // Optional
    category: 'Music',
    description: 'Musik in VC abspielen', 
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
        if (!voice_channel) return message.channel.send(embed);

        if(client.player.isPlaying(message)) {
            let song = await client.player.addToQueue(message, args.join(' '));

            const added = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Musik: **${song.name}** in der Warteschlange hinzugefügt`)


            // If there were no errors the Player#songAdd event will fire and the song will not be null.
            if(song)
                message.channel.send(added);
            return;
        } else {
            let song = await client.player.play(message, args.join(' '));

            const started = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Anfangen **${song.name}** zu spielen`)

            // If there were no errors the Player#songAdd event will fire and the song will not be null.
            if(song)
                message.channel.send(started);
            return;
        }
    }
}