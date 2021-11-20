module.exports = {
  name: "sudo",
  description: "Makes a webhook to impersonate someone",
  usage: "sudo <user> <message>",
  category: "utility",
  args: true,
  cooldown: 5,
  botpermission: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_WEBHOOKS")) {
            return message.channel.send(`Du bist nicht berechtigt, diesen Befehl zu verwenden! Webhook verwalten`)}
    message.delete();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Bitte gib einen Benutzer an!");
    const webhook = await message.channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
      channel: message.channel.id
    });
    await webhook.send(args.slice(1).join(" ")).then(() => {
      webhook.delete();
    });
  }
};