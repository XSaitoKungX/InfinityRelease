const backup = require('discord-backup');
module.exports = {
    name: "backup-load",
    aliases: ["bload"],
    category: "backup",
    usage: "i!backup-load",
    description: "Ein Server-Backup laden",
    run: async (client, message, args) => {
      if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: Du benötigst die Berechtigungen zum Verwalten von Nachrichten, um ein Backup auf diesem Server zu erstellen.');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send(':warning: Alle Serverkanäle, Rollen und Einstellungen werden gelöscht. Möchtest du wirklich fortfahren? Send `-confirm` or `cancel`!');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('Backup erfolgreich geladen!');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send(':x: Kein Backup für ID gefunden '+backupID+'!');
                    else
                        return message.author.send(':x: Ein Fehler ist aufgetreten: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send(':x: Cancelled.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: Zeitüberschreitung bei Befehl! Bitte erneut versuchen.');
        })

    }).catch(() => {
        return message.channel.send(':x: Kein Backup für ID gefunden '+backupID+'!');
    });

}
}