
"$TOEKN"
// if you need help ask in the help channel dont dm me
 const { default_prefix } = require("./config.json")
 const fetch = require("node-fetch");
const db =require("quick.db");
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const { emotes , emoji} =require("./config.json")
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});
const yts = require('yt-search')

client.queue = new Map();
client.vote = new Map();
const { ready } = require("./handlers/ready.js")

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.queue = new Map()
process.on('unhandledRejection', console.error);

  
client.on("message", async message => {
 

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});


client.on("guildMemberAdd", async member => {

  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {

    return;

  }
 let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/815889737750544405/827575020338675822/welcome_imgae.png",blur: false }) 
   const attachment = new discord.MessageAttachment(

      data,

      "welcome-image.png"

    );
 client.channels.cache.get(chx).send(`Willkommen auf ${member.guild.name}, Server ${member.user}\nDu bist der ${member.guild.memberCount}. Member auf unserem Server. Wir wünschen dir viel Spaß :tada: `, attachment);

});




client.on("message", async message => {
if (message.channel.name == "chatbot") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Bitte erwähne niemanden!**`);
 }
  message.channel.startTyping();
if (!message.content) return message.channel.send("Bitte sag irgendwas.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=cwkhan`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
    });
      message.channel.stopTyping();
}
});

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
 

const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
    storage: "./handlers/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager = manager;

client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`default_prefix${message.guild.id}`)
  if(prefix === null) prefix =default_prefix;
  
  if(!message.content.startsWith(default_prefix)) return;
 
})
client.on("ready", () => {
    client.user.setStatus("online");
    console.log("Automodv12 Beta ist bereit, dem Support-Server beizutreten https://dsc.gg/infinity-support")
});

 require('http').createServer((req, res) => res.end('AutomodBot is alive! Trete dem Support-Server bei https://dsc.gg/infinity-support')).listen(3000)


client.on
client.on("ready", () => {
    client.user.setActivity("i!help|Erstellt von XSaitoKungX ", { type: "PLAYING"})
})
const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false,
});

client.player = player;

new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    timeout: 10,
    volume: 150,
    quality: 'high',
});
const fs = require('fs')


 client.on('guildCreate', guild =>{

    const channelId = '911579396324880395'; //put your channel ID here

    const channel = client.channels.cache.get(channelId); 
     
    if(!channel) return; //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('Ich bin einem Server beigetreten!')
        .setDescription(`**Server Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('GREEN')
        .setFooter(`Ich bin jetzt in ${client.guilds.cache.size} Servers!`);
    channel.send(embed);
});


client.on('guildDelete', guild =>{
    const channelId = '911579705663193148';//add your channel ID
    const channel = client.channels.cache.get(channelId); //This Gets That Channel
    
    if(!channel) return;  //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('Ich habe einem Server verlassen!')
        .setDescription(`**Server Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(`Ich bin jetzt in ${client.guilds.cache.size} Servers!`);
    channel.send(embed);
});

 
console.log("Follow me on Insta: https://www.instagram.com/xmark.npx/")

const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()

client.on("message", async message => {
  if (message.channel.name == "abotchat") {
    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.channel.send(`**:x: Bitte erwähne niemanden**`);
    }
    message.channel.startTyping();
    if (!message.content) return message.channel.send("Bitte schreib etwas.");
    scb.chat({message: message.content, name: client.user.username, owner:"cwkhan", user: message.author.id, language:"auto"}).then(reply => {
    message.inlineReply(`${reply}`);
    })
    message.channel.stopTyping();
  }
});


require("./ExtendedMessage");


    allowedMentions: {
        // set repliedUser value to `false` to turn off the mention by default
        repliedUser: true
    }
    
    

client.login(process.env.TOKEN);
