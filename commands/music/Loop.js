const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'loop', // Optional
    aliases: [], // Optional
    category: 'Music',
    description: 'Loop the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if (!voice_channel) return message.channel.send(embed);
            // Enable repeat mode
            let status = client.player.setQueueRepeatMode(message, true);
            const loop = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Warteschlange wird auf unbestimmte Zeit wiederholt!`)
            if(status === null)
            return;
            message.channel.send(loop);
    }
}