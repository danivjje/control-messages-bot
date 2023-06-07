const getFileId = require('../helpers/get-file-id');
const { removeData, getData } = require('../api/firebase');

const removeDanger = async (ctx, dangerGifs, dangerStickers, chatReference) => {
    if (chatReference) {
        if (ctx.message.reply_to_message) {
            if (ctx.message.reply_to_message.animation) {
                const url = await getFileId(ctx, 'gif', true);
                if (dangerGifs.some(gif => gif.link === url)) {
                    try {
                        const urlIndex = dangerGifs.findIndex(item => item.link === url);
                        dangerGifs.splice(urlIndex, 1);

                        const gifsKeys = [];
                        await getData(`chats/${chatReference}/gifs`).then(result => gifsKeys.push(...Object.keys(result)));
                        await removeData(`chats/${chatReference}/gifs/${gifsKeys[urlIndex]}`);

                        return ctx.reply('succesfully');
                    } catch {
                        return ctx.reply('unknown error, @danivjje');
                    }
                }

                return ctx.reply(`gif doesnt set as dangerous`);
            }

            if (ctx.message.reply_to_message.sticker) {
                const url = await getFileId(ctx, 'sticker', true);
                if (dangerStickers.some(sticker => sticker.link === url)) {
                    try {
                        dangerStickers.splice(dangerStickers.findIndex(item => item.link === url), 1);
                        await removeData();
                        return ctx.reply('succesfully');
                    } catch {
                        return ctx.reply('unknown error, @danivjje');
                    }
                }

                return ctx.reply('sticker doesnt set as dangerous');
            }

            return ctx.reply('not a gif/sticker');
        }

        return ctx.reply('for remove any gif/sticker from dangerous list - use /remove_danger as reply for gif/sticker');
    }

    return 'chat is not registered, use /register_chat';
}

module.exports = removeDanger;