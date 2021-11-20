const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'disable-loop', // Optional
    aliases: ['dloop', 'dl'], // Optional
    category: 'Music',
    description: 'Stop looping the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if (!voice_channel) return message.channel.send(embed);
            // Disable repeat mode
            let status = client.player.setQueueRepeatMode(message, false);

            const disloop = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Warteschlange wird nicht mehr auf unbestimmte Zeit wiederholt!`)
            if(status === null)
            return;
            message.channel.send(disloop);
    }
}