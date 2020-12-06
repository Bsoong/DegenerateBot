const { channels, roles, prefix, commands } = require("../channelConstants");

module.exports = function (client) {
    client.on("guildMemberAdd", (member) => {
        member.roles.add(roles.theboys, "DegenBot gave the newly joined member the Entry Role.").catch(console.error)
    });
}