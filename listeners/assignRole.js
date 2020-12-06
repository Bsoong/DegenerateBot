const { channels, roles, prefix, commands } = require("../channelConstants");
const Discord = require('discord.js')

function isCommand(s) {
    s = s.slice(0, 1);
    if (s == prefix) {
        return true
    } else {
        return false
    }
}

module.exports = function (client) {
    client.on('message', async message => {
        try {
            if (message.channel == channels.welcome) {
                const user = message.author.id
                if (isCommand(message.content)) {
                    const msg = message.content.toLowerCase();
                    const args = msg.slice(prefix.length).split(/ +/);
                    if (args[0] == commands[0]) {
                        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === args[1])
                        if (role == undefined) {
                            const errorEmbed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("That role doesn't exist! Please input an actual role, thanks.")
                                .setAuthor('Degen Bot Millionaire')
                                .setDescription(`List of Current Roles: 
                                    Valorant,
                                    CSGO,
                                    LoL,
                                    Smash,
                                    Warzone,
                                    MMO,
                                    Minecraft,
                                    Apex,
                                    Food,
                                    AmongUs,
                                    RocketLeague
                                    Anime`)
                            client.users.cache.get(user).send(errorEmbed);
                            message.delete({ timeout: 10000 });
                            return;
                        }
                        if (!message.member.roles.cache.has(role)) {
                            try {
                                console.log(role)
                                await message.member.roles.add(role, "Requested via Degenerate Bot").catch(console.error);
                                client.users.cache.get(user).send(`Successfully given role ${args[1]}!`)
                                message.delete({ timeout: 10000 });
                                return;
                            } catch (e) {
                                console.log(e);
                            }
                        } else {
                            client.users.cache.get(user).send("You already have that roll.");
                            message.delete({ timeout: 10000 });
                        }
                    }

                }
            }
        } catch (e) {
            console.log(e)
        }
    })
}