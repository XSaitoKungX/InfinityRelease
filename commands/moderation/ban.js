const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) 
    return message.reply(`Du hast keine Rechte, um jemanden zu bannen!`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) 
    return message.reply(`Ich habe keine Rechte, jemanden zu bannen!`)
    
    if(!args[0]) return message.reply(`Bitte erwähne jemanden, den du bannen möchtest`)
    
    if(!target) return message.reply(`Ich kann dieses Mitglied nicht finden!`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`Der Benutzer hat leider mehr Rechte als du!`)
    }
    
    if(target.id === message.author.id) return message.reply(`Ich kann dich nicht bannen, da du der Owner bist! :pleading_face:`)
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Gebannter User: \`${target}\` Grund: \`${reason || "Keine Begründung angegeben"}\``)
      
      message.channel.send(embed)
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply(`Ich kann dieser User nicht bannen, stelle sicher, dass meine Rolle über seiner/ ihrer steht!`)
    }
    return undefined
  }
};