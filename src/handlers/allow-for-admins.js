const checkStatus = require('../helpers/check-status');
const { changeAdminStatus } = require('../api/firebase');

const allowForAdmins = async (ctx, chatReference, bot, isAllowForAdmins) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator) {
            if (isAllowForAdmins[0]) {
                try {
                    await changeAdminStatus(chatReference, false);
                    isAllowForAdmins[0] = false;
                    return ctx.reply('теперь запрещённые сообщения от создателя и админов тоже будут удалятся');
                } catch {
                    return ctx.reply('unknown error, @danivjje');
                }
            }

            try {
                await changeAdminStatus(chatReference, true);
                isAllowForAdmins[0] = true;
                return ctx.reply('теперь запрещённые сообщения от создателя и админов не будут удалятся');
            } catch {
                return ctx.reply('unknown error, @danivjje');
            }
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = allowForAdmins;