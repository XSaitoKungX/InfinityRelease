const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'volume', // Optional
    category: 'Music',
    description: 'Set the volume of the bot in the vc', 
    aliases: ['setvolume'], // Optional
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Die Musik wurde gestoppt und die Warteschlange wurde gelöscht!`)
            if (!voice_channel) return message.channel.send(embed);
            let isDone = client.player.setVolume(message, parseInt(args[0]));
            const volume = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Lautstärke auf ${args[0]}% gestellt!`)
            if(isDone)
            message.channel.send(volume);
    }
}