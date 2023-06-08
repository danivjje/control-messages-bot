const getFileId = require('../helpers/get-file-id');
const checkStatus = require('../helpers/check-status');
const { postData } = require('../api/firebase');

const setDanger = async (ctx, dangerGifs, dangerStickers, chatReference, bot) => {
    if (chatReference) {
        const isCreator = await checkStatus(ctx, bot);
        if (isCreator) {
            if (ctx.message.reply_to_message) {
                if (ctx.message.reply_to_message.sticker) {
                    const url = await getFileId(ctx, 'sticker', true);
                    if (!dangerStickers.some(sticker => sticker.link === url)) {
                        await postData(`chats/${chatReference}/stickers`, { link: url });
                        dangerStickers.push({ link: url });
                        return ctx.reply('запретил');
                    }

                    return ctx.reply('этот стикер уже запрещён');
                }

                if (ctx.message.reply_to_message.animation) {
                    const url = await getFileId(ctx, 'gif', true);
                    if (!dangerGifs.some(gif => gif.link === url)) {
                        await postData(`chats/${chatReference}/gifs`, { link: url });
                        dangerGifs.push({ link: url });
                        return ctx.reply('запретил');
                    }

                    return ctx.reply('эта гифка уже запрещена');
                }

                return ctx.reply('не гифка/стикер');
            }

            return ctx.reply('чтобы запретить гифку/стикер нужно ответить командой на неё');
        }

        return ctx.reply('нет прав');
    }

    return ctx.reply('сначала /register_chat');
}

module.exports = setDanger;
