const getFileId = require('../helpers/get-file-id');

const setDanger = async (ctx, dangerGifs, dangerStickers) => {
    if (ctx.message.reply_to_message) {
        if (ctx.message.reply_to_message.sticker) {
            const url = await getFileId(ctx, 'sticker', true);
            dangerStickers.push(url);
            return ctx.reply('succesfully sticker');
        }

        if (ctx.message.reply_to_message.animation) {
            const url = await getFileId(ctx, 'gif', true);
            dangerGifs.push(url);
            return ctx.reply('succesfully gif');
        }

        return ctx.reply('not a gif/sticker');
    }

    return ctx.reply('for set any gif/sticker as dangerous - use /set_danger as reply for gif/sticker');
}

module.exports = setDanger;
