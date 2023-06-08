const { clearList } = require('../api/firebase');

const clearDangerList = async (ctx, chatReference, list, arr) => {
    try {
        await clearList(chatReference, list);
        arr.length = 0;
        ctx.reply('очистил');
    } catch {
        return ctx.reply('unknown error @danivjje');
    }
}

module.exports = clearDangerList;