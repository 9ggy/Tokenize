const { EmbedBuilder } = require('discord.js');
const { getHalfToken } = require("./token");
const { logChannel } = require('../config.json');

const logTokenLeak = function (client, member) {
	const logLeakEmbed = new EmbedBuilder()
		.setColor(0xEDE7E6)
		.setTitle('Sent!')
		.setURL('https://github.com/9ggy/')
		.setDescription(`${member.user.tag} Has been DM'ed.`)
		.setThumbnail(member.displayAvatarURL())
		.addFields(
			{ name: 'Half of their Token:', value: '`' + getHalfToken(Number.toString(member.id)) + '`' },
		)
		.setTimestamp()
		.setFooter({ text: 'Tokenize - 9ggy' });

	client.channels.fetch(logChannel)
		.then(
			channel => channel.send({ embeds: [logLeakEmbed] })
		);

	return;
}


const logFailedMessage = function (client, member) {
	const logLeakEmbed = new EmbedBuilder()
		.setColor(0xBA0D2D)
		.setTitle('Failed')
		.setURL('https://github.com/9ggy/')
		.setDescription(`Something went wrong trying to DM ${member.user.tag}, their DM's may be closed.`)
		.setThumbnail(member.displayAvatarURL())
		.setTimestamp()
		.setFooter({ text: 'Tokenize - 9ggy' });

	client.channels.fetch(logChannel)
		.then(
			channel => channel.send({ embeds: [logLeakEmbed] })
		);

	return;
}

module.exports = { logFailedMessage, logTokenLeak };
