module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send("<a:crossWrong: Es scheint keine gültige Nummer zu sein");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send("Slowmode ist jetzt " + amount + " seconds");
        return;
      } else {
        message.channel.send("Slowmode ist jetzt " + amount + " second");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send("Slowmode ist jetzt " + amount + " minutes");
        return;
      } else {
        message.channel.send("Slowmode ist jetzt " + amount + " minute");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send("Slowmode ist jetzt " + amount + " hours");
        return;
      } else {
        message.channel.send("Slowmode ist jetzt " + amount + " hour");
        return;
      }
    } else {
      message.channel.send(
        "Du kannst nur seconds(s), minutes(min) and hours(h) einstellen!"
      );
    }
  }
};
