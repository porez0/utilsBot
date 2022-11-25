const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
            .setName('think')
            .setDescription('bot przez chwile bedzie myslal!'),
    async execute(interaction) {
        const randomNumber = (Math.random() * 100).toFixed(0);
        await interaction.deferReply();
        await wait(randomNumber * 1000);
        await interaction.editReply(`bot w sumie myślał przez ${randomNumber} sekund`);
    }
}