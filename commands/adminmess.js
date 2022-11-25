const { SlashCommandBuilder, EmbedBuilder, CategoryChannel, userMention } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminmess')
        .setDescription('Wysyła wiadomość przez bota!')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Wpisana wartość będzie wyświetlona jako wiadomość')
            .setRequired(true)    
            )
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Wiadomość zostanie wysłana na wybrany kanał')
            .setRequired(true)
            )
        .addMentionableOption(option => option
            .setName('mention')
            .setDescription('Oznaczyć kogoś?')
            )
        .addStringOption(option => option
            .setName('img')
            .setDescription('Jeżeli chcesz dodać obrazek wklej tutaj jego url')
            )
        ,
        
    async execute(interaction) {
        const targetChannel = interaction.options.getChannel('channel');
        const text = interaction.options.getString('text');
        const pinge = interaction.options.getMentionable('mention');
        const img = interaction.options.getString('img');

        if(!targetChannel.type == 0){
            const embedErr = new EmbedBuilder()
                .setTitle('Wystąpił błąd!')
                .setColor("Red")
                .setDescription(`Wiadomość nie może zostać wysłana na podany kanał -> ${targetChannel}`)
            await interaction.reply({
                embeds: [embedErr],
                ephemeral: true
            })
            return;
        }
        //nie ważne jak ważne że działa ;]
        if(img) {
            const embed1 = new EmbedBuilder()
                .setTitle('Wykonano!')
                .setColor("Green")
                .setDescription(`Wiadomość została wysłana do: ${targetChannel}`)
            const embedimg = new EmbedBuilder()
                .setTitle(`Wiadomość od ${interaction.user.username}`)
                .setColor("Red")
                .setImage(img)
                .setDescription(text)
            await interaction.reply({
                embeds: [embed1],
                ephemeral: true
            })
            await targetChannel.send({
                embeds: [embedimg],
            })
            if(pinge) {
                await targetChannel.send(`${pinge}`)
            } else {
                return;
            }
            return;
        }

        const embed1 = new EmbedBuilder()
            .setTitle('Wykonano!')
            .setColor("Green")
            .setDescription(`Wiadomość została wysłana do: ${targetChannel}`)

        const embed2 = new EmbedBuilder()
            .setTitle(`Wiadomość od ${interaction.user.username}`)
            .setColor("Red")
            .setDescription(text)


        await interaction.reply({
            embeds: [embed1],
            ephemeral: true
        })
        await targetChannel.send({
            embeds: [embed2],
        })
        if(pinge) {
            await targetChannel.send(`${pinge}`)
        } else {
            return;
        }


    }
}