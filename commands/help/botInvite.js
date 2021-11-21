const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
// require('discord-buttons')(client);
const disbut = require('discord-buttons');
disbut(client);

module.exports = {
  name: "botinvite",
  aliases: ["botinv", "getbotinv"],
  description: "Invite Bot Command",
  category: "info",
 // users will need premium to execute this
  run: async (bot, message, args) => {
      let button = new disbut.MessageButton()
        .setStyle('LINK')
        .setLabel('Invite Bot Link')  // default: NO_LABEL_PROVIDED
        .setID('click_to_function')  // note: if you use the style 'url' you must privide url using => .setURL('https://example.com')
        .setDisabled(false);  //  disables the button | default: false

        message.channel.send('Click Here to Invite Me!..', button);
  },
};
//      message.buttons('Invite me', {
//             buttons: [
//                 {
//                     style: 'green',
//                     label: 'Click to function!',
//                     id: 'click_to_function'
//                 },
//                 {
//                     style: 'url',
//                     label: 'Vote for me!',
//                     url:'https://dsc.gg/infinity.net'
//                 }
//             ]
//         })
//   }}