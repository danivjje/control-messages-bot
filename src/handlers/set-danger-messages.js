const setDangerMessages = (ctx, dangerMessages) => {
    let newMessages = ctx.message.text.split(' ').slice(1).filter(item => Boolean(item));
    if (newMessages.length < 1) return ctx.reply('enter anything after /set_messages');

    dangerMessages.push(...newMessages.map(item => item.toLowerCase()));

    ctx.reply(`${newMessages.join(', ')} was(re) succesfuly seted as danger message(s)`);
}

module.exports = setDangerMessages;