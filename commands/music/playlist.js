const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'playlist',
    aliases: ['plist'], // Optional
    category: 'Music',
    description: 'Play a playlist in the vc', 
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
        if (!voice_channel) return message.channel.send(embed);
        // If maxSongs is -1, will be infinite.
        await client.player.playlist(message, {
            search: args.join(' '),
            maxSongs: -1
        });
    }
}