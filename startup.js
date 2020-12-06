require('dotenv').config();
const { roles, channels } = require('./channelConstants');
const TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000
const prefix = "!"
const entryRole = roles.theBoys;

if (!TOKEN) {
    console.error("Error: Please Define a token");
    process.exit(1);
}

const Discord = require('discord.js')
const client = new Discord.Client();

client.once('ready', () => {
    console.log("Degenerate bot is ready to be a degenerate.")
})

require('./listeners/assignRole.js')(client);
require('./listeners/onJoin.js')(client);
client.login(TOKEN);
