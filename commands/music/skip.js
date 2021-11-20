const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'skip', // Optional
    aliases: ['sk'], // Optional
    category: 'Music',
    description: 'Skip the song that its playing.', 
        run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Du musst dich in einem VC befinden, um diesen Befehl auszuführen!`)
            if(!client.player.isPlaying(message)) {
			message.channel.send('Musik muss abgespielt werden, um den Titel zu überspringen');

			return;
		}

		await client.player.skip(message);

		message.channel.send(embed);
	},
};