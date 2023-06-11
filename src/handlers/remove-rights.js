const checkStatus = require('../helpers/check-status');
const { removeData, getData } = require('../api/firebase');

const removeRights = async (ctx, chatReference, bot, adminsList) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator) {
            if (ctx.message.reply_to_message) {
                const userId = await ctx.message.reply_to_message.from.id;
                if (adminsList.some(item => item.id === userId)) {
                    try {
                        const rightsKeys = [];
                        const userIndex = adminsList.findIndex(item => item.id === userId);
                        console.log(adminsList);
                        await getData(`chats/${chatReference}/admins`).then(result => {
                            rightsKeys.push(...Object.keys(result));
                        });

                        await removeData(`chats/${chatReference}/admins/${rightsKeys[userIndex + 1]}`);
                        adminsList.splice(userIndex, 1);
                        return ctx.reply('забрал');
                    } catch {
                        return ctx.reply('unknown error, @danivjje');
                    }
                }

                return ctx.reply('у него и так нет прав');
            }

            return ctx.reply('чтобы забрать права нужно ответить на любое сообщение пользователя');
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = removeRights;