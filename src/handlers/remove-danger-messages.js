const removeDangerMessages = (ctx, dangerMessages) => {
    const messages = ctx.message.text.split(' ').slice(1);
    if (messages.length < 1) return ctx.reply('enter anything after /remove_messages');

    const removedMessages = [];

    messages.map(msg => {
        if (dangerMessages.includes(msg)) {
            const msgIndex = dangerMessages.findIndex(item => item === msg);
            dangerMessages.splice(msgIndex, 1);
            removedMessages.push(msg);
        }
    });

    return ctx.reply(`${removedMessages.join(', ')} were succesfully removed from the list of dangerous messages`);
}

module.exports = removeDangerMessages;