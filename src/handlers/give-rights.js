const checkStatus = require('../helpers/check-status');
const { setAdmin } = require('../api/firebase');

const giveRights = async (ctx, chatReference, bot, adminsList) => {
    if (chatReference) {
        const isCreator = checkStatus(ctx, bot);
        if (isCreator) {
            if (ctx.message.reply_to_message) {
                const userId = await ctx.message.reply_to_message.from.id;
                if (!adminsList.some(item => item.id == userId)) {
                    try {
                        await setAdmin(chatReference, userId);
                        adminsList.push({ id: userId });
                        return ctx.reply('выдал');
                    } catch {
                        return ctx.reply('unknown error, @danivjje');
                    }
                }

                return ctx.reply('уже есть');
            }

            return ctx.reply('чтобы дать кому-то админ-права в боте ответь на любое его сообщение командой');
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = giveRights;