const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "reply",
  aliases: ["rly"],
  category: "suggestion",
  run: async (client, message, args) => {
    
let channel = await db.fetch(`suggestion_${message.guild.id}`);
if (channel === null) return;
     
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`❌ | Ich glaube nicht, dass das eine Message-ID war!`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`❌ | Du hast vergessen, die Nachrichten-ID anzugeben!`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`❌ | Du hast vergessen, die Antwort anzugeben!`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
      .setDescription(`✔  | Der Vorschlag wurde erfolgreich beantwortet.`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
      .setDescription(`❌ | Kein Vorschlagskanal gefunden!`)
      .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
      .setDescription(`❌ | Keine Nachricht mit dieser ID gefunden!`)
      .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`❌ | Keine Nachricht mit dieser ID gefunden!`)
      .setColor("FF2052")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("BLUE")
      .addField(`Reply from ${message.author.tag}`, replyQuery)
      .setFooter("Status: Replied")
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(
        `Du hast eine Antwort auf deinen Vorschlag erhalten ✨🎉. 
        **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("RANDOM")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}