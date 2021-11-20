const backup = require('discord-backup');
module.exports = {
    name: "backup-create",
    aliases: ["bc"],
    category: "backup",
    usage: "i!backup-create",
    description: "Den Ping des Bots nachgucken!",
    run: async (client, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Du benötigst die Berechtigungen zum Verwalten von Nachrichten, um ein Backup auf diesem Server zu erstellen!');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Backup erfolgreich erstellt! Hier ist deine ID: `'+backupData.id+'` Use `i!load-backup '+backupData.id+'` um das Backup auf einen anderen Server zu laden!');

    }).catch(() => {

        return message.channel.send(':x: Es ist ein Fehler aufgetreten, bitte melde dich beim Support-Server ');

    });

}
}