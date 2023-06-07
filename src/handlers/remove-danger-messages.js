const { removeData, getData } = require('../api/firebase');

const removeDangerMessages = async (ctx, dangerMessages, chatReference) => {
    if (chatReference) {
        const messages = ctx.message.text.split(' ').slice(1);
        if (messages.length < 1) return ctx.reply('enter anything after /remove_messages');


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

                return await ctx.reply(`${removedMessages.join(', ')} were succesfully removed from the list of dangerous messages`);
            } catch {
                return ctx.reply('unknown error, @danivjje');
            }
        }

        return ctx.reply('these messages is not set as dangerous');
    }

    return ctx.reply('chat is not registered, use /register_chat');
}

module.exports = removeDangerMessages;