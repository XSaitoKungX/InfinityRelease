const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
  name: "purge",
  category: "moderation",
  aliases: ['clear', 'delete', 'prune'],

  async run(bot, message, args) {
// UPDATE ^ ACCORDING TO YOUR HANDLER
let prefix = "q"
 try { 
 
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Du hast keine **MANAGE_MESSAGES**-Permissions, um diesen Befehl auszuführen!");
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Ich habe keine **MANAGE_MESSAGES**-Permissions, um diesen Befehl auszuführen!");

const commands = [
`bots\` - Delete messages sent by bots. (Ignore humans)`, 
`humans\` - Delete messages sent by humans. (Ignore bots)`, 
`embeds\` - Delete messages containing rich embeds.`, 
`files\` - Delete messages containing files/images/attachments.`, 
`mentions\` - Delete messages containing member/user/channel/role mentions.`, 
`pins\` - Delete messages which are pinned.`, 
`text\` - Delete messages containing only text. (Ignores files/images/attachments, embeds)`, 
`match\` <text> - Delete messages containing text.` , 
`not\` <text> - Delete messages not containing text.`, 
`startswith\` <text> - Delete messages starts with text.`, 
`endswith\` <text> - Delete messages ends with text.`
]

const embd = new Discord.MessageEmbed() 
.setColor("BLUE") 
.setTitle("Purge | Clear | Delete | Prune") 
.setDescription(`Mehrere Nachrichten aus einem Kanal löschen. (Ignoriert die angehefteten Nachrichten und das Limit beträgt 100)`) 
.addField("Usage", `\`${prefix}purge <amount>\` - Mehrere Nachrichten löschen.\n\`${prefix}purge <amount> --${commands.join(`\n\`${prefix}purge <amount> --`)}`) 
.setFooter(`${prefix}purge, ${prefix}clear, ${prefix}delete, ${prefix}prune`) 




if(!args[0] || !args.length) return message.channel.send(embd);
let amount = Number(args[0],10) || parseInt(args[0]);
if(isNaN(amount) || !Number.isInteger(amount)) return message.channel.send("Bitte gib die Anzahl von Nachrichten ein, die gelöscht werden sollen.");
if(!amount || amount < 2 || amount > 100) return message.channel.send("Bitte gib eine Nachrichtennummer zwischen 2 und 100 ein.")
if(!args[1]) {

try {
  await message.delete()
await message.channel.bulkDelete(amount).then(async (m) => { 
  
   let embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:4000})); 
})

   } catch (e) { 
     console.log(e) 
     message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`)
     

   }

} else if(args[1]) {
  let msg;
  let data;
  let embed;
  switch(args[1]) {
    case "--bots":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(ms.author.bot && !ms.pinned) data.push(ms)
    })
   
   try {
     await message.delete()
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
     case "--humans":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.author.bot && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--embeds":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
      await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--files":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.attachments.first() && !ms.pinned) data.push(ms)
    })
    
   try {
  
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;case "--text":
    msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.attachments.first() && !ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
  case "--mentions":
     msg = await message.channel.messages.fetch({limit: amount})
  data = []
    msg.map(m => m).forEach(ms => {
      if((ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first())&& !ms.pinned) data.push(ms)
    })
    
   try {
 
       await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--pins":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--match":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
    
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--not":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--startswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
case "--endswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅ | Gelöscht - **${m.size}**/**${amount}** Messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Du kannst nur Nachrichten löschen, die nicht älter als 14 Tage sind.`) 
   }

      break;
default:
return message.channel.send(embd) 
break;
}

} else {
 return message.channel.send(`Ein Fehler ist aufgetreten.`)
}
} catch (error) {
  console.log(error)
  message.channel.send(`Ein Fehler ist aufgetreten: \`${error}\``)
}


}
}


