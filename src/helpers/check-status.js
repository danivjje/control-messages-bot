const checkStatus = async (ctx, bot) => {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const info = await bot.telegram.getChatMember(chatId, userId);
    return info.status === 'creator';
}

module.exports = checkStatus;