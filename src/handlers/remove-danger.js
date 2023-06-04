const getFileId = require('../helpers/get-file-id');

const removeDanger = async (ctx, dangerGifs, dangerStickers) => {
    if (ctx.message.reply_to_message) {
        if (ctx.message.reply_to_message.animation) {
            const url = await getFileId(ctx, 'gif', true);
            if (dangerGifs.includes(url)) {
                dangerGifs.splice(dangerGifs.findIndex(item => item === url), 1);
                return ctx.reply('succesfully');
            }

            return ctx.reply(`gif doesnt set as dangerous`);
        }

        if (ctx.message.reply_to_message.sticker) {
            const url = await getFileId(ctx, 'sticker', true);
            if (dangerStickers.includes(url)) {
                dangerStickers.splice(dangerStickers.findIndex(item => item === url), 1);
                return ctx.reply('succesfully');
            }

            return ctx.reply('sticker doesnt set as dangerous');
        }

        return ctx.reply('not a gif/sticker');
    }

    return ctx.reply('for remove any gif/sticker from dangerous list - use /remove_danger as reply for gif/sticker');
}

module.exports = removeDanger;