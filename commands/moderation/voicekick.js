module.exports = {
  name: "voicekick",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "Ich habe nicht die richtigen Berechtigungen, um diesen Befehl zu verwenden!"
      );

    if (!message.mentions.members.first())
      return message.channel.send(
        `Bitte erwähne den Benutzer, den du aus dem Sprachkanal kicken möchtest!`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`Der Benutzer befindet sich in keinem Sprachkanal!`);

    message.mentions.members.first().voice.kick();
    
    message.channel.send(`Der Benutzer wurde aus dem Sprachkanal gekickt!`)
  }
};