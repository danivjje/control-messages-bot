const { postData } = require('../api/firebase');

const setDangerMessages = async (ctx, dangerMessages, chatReference) => {
    if (chatReference) {
        let newMessages = await ctx.message.text.split(' ').slice(1).filter(item => Boolean(item));
        if (newMessages.length < 1) return ctx.reply('введи слова, которые хочешь запретить после /set_messages');

        try {
            for (let i = 0; i < newMessages.length; ++i) {
                const item = newMessages[i];
                if (dangerMessages.some(msg => msg.title === item)) {
                    newMessages.splice(i, 1);
                    --i;
                } else {
                    await postData(`chats/${chatReference}/messages`, { title: item.toLowerCase() });
                    dangerMessages.push({ title: item.toLowerCase() });
                }
            }

            return await ctx.reply(newMessages.length > 0
                ? `слова ${newMessages.map(item => item.toLowerCase()).join(', ')} были успешно установлены как запрещённые`
                : 'эти слова уже запрещены');
        } catch {
            return ctx.reply('unknown error, @danivjje');
        }
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = setDangerMessages;