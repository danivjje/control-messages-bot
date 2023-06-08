const { clearList } = require('../api/firebase');
const checkStatus = require('../helpers/check-status');

const clearDangerList = async (ctx, chatReference, list, arr, bot) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator) {
            try {
                await clearList(chatReference, list);
                arr.length = 0;
                ctx.reply('очистил');
            } catch {
                return ctx.reply('unknown error @danivjje');
            }
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = clearDangerList;