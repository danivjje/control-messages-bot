const getFileId = require('../helpers/get-file-id');
const checkStatus = require('../helpers/check-status');
const { removeData, getData } = require('../api/firebase');

const removeDanger = async (ctx, dangerGifs, dangerStickers, chatReference, bot) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator) {
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

                            return ctx.reply('разрешил');
                        } catch {
                            return ctx.reply('unknown error, @danivjje');
                        }
                    }

                    return ctx.reply('гифка не запрещена');
                }

                if (ctx.message.reply_to_message.sticker) {
                    const url = await getFileId(ctx, 'sticker', true);
                    if (dangerStickers.some(sticker => sticker.link === url)) {
                        try {
                            dangerStickers.splice(dangerStickers.findIndex(item => item.link === url), 1);
                            await removeData();
                            return ctx.reply('разрешил');
                        } catch {
                            return ctx.reply('unknown error, @danivjje');
                        }
                    }

                    return ctx.reply('стикер не запрещён');
                }

                return ctx.reply('не гифка/стикер');
            }

            return ctx.reply('чтобы запретить гифку/стикер нужно ответить на неё командой');
        }

        return ctx.reply('нет прав');
    }

    return 'сначала /register_chat';
}

module.exports = removeDanger;