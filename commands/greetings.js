const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
            .setName('greet')
            .setDescription('greets user!'),
    async execute(interaction) {
        await interaction.reply(`Hello ${interaction.user.tag}`)
        await wait(2000);
        await interaction.deleteReply();
    }
}