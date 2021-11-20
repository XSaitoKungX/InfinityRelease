const Discord = require("discord.js")
module.exports = {
    name: 'embedgen',
    aliases: ["emb"],
    description: 'embed Generator',
    category: "info",
       run: async (client, message, args) => {

       try {

            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };
            //===============================================================================================
            // Getting Started
            const embed = new Discord.MessageEmbed();
            message.channel.send("Antworte mit `skip` oder `no` für die nächste Frage, antwortest du mit `cancel`, um den Befehl zu stoppen.");
            
    
            //===============================================================================================
            // Getting Title
            message.channel.send("Soll deine Embed einen Titel haben?");
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send('Embed Generator Abgebrochen.')
            if (title.first().content !== 'skip' && title.first().content !== 'cancel') embed.setTitle(title.first().content);
    
            //===============================================================================================
            // Getting Description
            message.channel.send("Großartig, jetzt möchtest du, dass deine Embed eine Beschreibung hat?");
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send('Embed Generator Abgebrochen.')
            if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') embed.setDescription(Description.first().content);
    
            //===============================================================================================
            // Getting Footer
            message.channel.send("Möchtest du, dass deine Embed eine Fußzeile enthält? Wenn nein, dann `cancel`");
            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send('Embed Generator Abgebrochen. ')
            if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel') embed.setFooter(Footer.first().content); 
    
            //===============================================================================================
            // Getting URL
            
    
            //===============================================================================================
            // Getting Color
            message.channel.send("Möchtest du, dass deine Embed eine bestimmte Farbe hat? Standard ist Schwarz");
            let Color = await message.channel.awaitMessages(filter, options);
            if (Color.first().content == 'cancel') return message.channel.send('Embed Generator Abgebrochen.')
            if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') embed.setColor(Color.first().content.toUpperCase() || "2f3136")
    
            //===============================================================================================
            // Getting Author Field
            message.channel.send("Soll deine Embed also ein Autorenfeld haben?");
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send('Embed Generator Abgebrochen.')
            if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') embed.setAuthor(Author.first().content);
    
            //===============================================================================================
            // Getting TimeStamp
            message.channel.send("Möchtst du auch, dass deine Embed einen TimeStamp hat? Antworte mit 'yes' or 'no'");
            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send('Embed Generator Abgebrochen.')
            if (TimeStamp.first().content !== 'yes') embed.setTimestamp();
    
            message.channel.send(embed)
        } catch (error) {
            console.error(error);
        }
    }
}