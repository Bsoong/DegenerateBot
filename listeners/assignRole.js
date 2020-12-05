const { channels, roles, prefix, commands } = require("../channelConstants");

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
            if (message.channel == channels.testChannel) {
                const user = message.author.id
                if (isCommand(message.content)) {
                    const msg = message.content.toLowerCase();
                    const args = msg.slice(prefix.length).split(/ +/);
                    // try {
                    //     message.delete(1000)
                    // } catch (e) {
                    //     console.log(e);
                    // }
                    if (args[0] == commands[0]) {
                        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === args[1])
                        if (role == undefined) {
                            client.users.cache.get(user).send(`That role doesn't exist! Please input an actual role, thanks.
    List of Current Roles: 
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
            Anime`);
                        }
                        if (!message.member.roles.cache.has(role)) {
                            try {
                                console.log(role)
                                await message.member.roles.add(role, "Requested via Degenerate Bot").catch(console.error);
                                client.users.cache.get(user).send(`Successfully given role ${args[1]}!`)
                            } catch (e) {
                                console.log(e);
                            }
                        } else {
                            client.users.cache.get(user).send("You already have that roll.");
                        }
                    }


                }
            }
        } catch (e) {
            console.log(e)
        }
    })
}