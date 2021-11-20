const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   category: "moderation",
   description: "Locks a Channel"
}
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("Du hast keine Rechte, um diesen Befehl zu benutzen!")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`ðŸ”’ ${message.channel} wurde verschlossen!`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
