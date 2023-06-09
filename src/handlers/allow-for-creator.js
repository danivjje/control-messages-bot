const checkStatus = require('../helpers/check-status');

const allowForCreator = async (ctx, chatReference, bot, isAllowForCreator) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator) {
            if (isAllowForCreator[0]) {
                isAllowForCreator[0] = false;
                return ctx.reply('теперь запрещённые сообщения от создателя тоже будут удалятся');
            }

            isAllowForCreator[0] = true;
            return ctx.reply('теперь запрещённые сообщения от создателя не будут удалятся');
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = allowForCreator;