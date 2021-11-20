const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmd", "commands"],
  description:
    "Eine Liste aller Befehle nachgucken und vielleicht lernst du sogar alle Befehlsdetails kennst!",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("> ❯ Description", command.description || "Nicht bereitgestellt :(")
        .addField("> ❯ Usage", "`" + command.usage + "`" || "Nicht bereitgestellt")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription('**Ein unterhaltsamer und moderierender Bot mit über 150 Befehlen und über 10 Kategorien ** \n**Wenn du einen Fehler hast, schreibst du ** `i!bug` **dein Fehler muss aus 10 Buchstaben bestehen **')
  
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        
        .setThumbnail(client.user.displayAvatarURL());
          
      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unbekannt";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }
     emx.addField('Wichtige links ','**:link:  [Support](https://dsc.gg/infinity-support)**  | **[website](-)**')
      return message.channel.send(emx)

    }
  }
};
