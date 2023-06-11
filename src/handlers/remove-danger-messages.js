const { removeData, getData } = require('../api/firebase');
const checkStatus = require('../helpers/check-status');

const removeDangerMessages = async (ctx, dangerMessages, chatReference, bot, adminsList) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator || adminsList.some(item => item.id == ctx.message.from.id)) {
            const messages = ctx.message.text.split(' ').slice(1);
            if (messages.length < 1) return ctx.reply('введи запрещённые слова после /remove_messages');

            if (dangerMessages.some(item => messages.includes(item.title))) {
                try {
                    const removedMessages = [];

                    for (let i = 0; i < messages.length; ++i) {
                        const msg = messages[i];
                        if (dangerMessages.some(item => item.title === msg)) {
                            const msgKeys = [];
                            const msgIndex = dangerMessages.findIndex(item => item.title === msg);

                            await getData(`chats/${chatReference}/messages`).then(result => {
                                msgKeys.push(...Object.keys(result));
                            });
                            await removeData(`chats/${chatReference}/messages/${msgKeys[msgIndex + 1]}`);

                            dangerMessages.splice(msgIndex, 1);
                            removedMessages.push(msg);
                        }
                    }

                    return await ctx.reply(`слова ${removedMessages.join(', ')} были успешно удалены из списка запрещённых сообщений`);
                } catch {
                    return ctx.reply('unknown error, @danivjje');
                }
            }

            return ctx.reply('не установлены как запрещённые');
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = removeDangerMessages;