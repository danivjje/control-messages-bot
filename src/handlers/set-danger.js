const getFileId = require('../helpers/get-file-id');
const { postData } = require('../api/firebase');

const setDanger = async (ctx, dangerGifs, dangerStickers, chatReference) => {
    if (chatReference) {
        if (ctx.message.reply_to_message) {
            if (ctx.message.reply_to_message.sticker) {
                const url = await getFileId(ctx, 'sticker', true);
                if (!dangerStickers.some(sticker => sticker.link === url)) {
                    await postData(`chats/${chatReference}/stickers`, { link: url });
                    dangerStickers.push({ link: url });
                    return ctx.reply('succesfully');
                }

                return ctx.reply('this sticker is already set as dangerous');
            }

            if (ctx.message.reply_to_message.animation) {
                const url = await getFileId(ctx, 'gif', true);
                if (!dangerGifs.some(gif => gif.link === url)) {
                    await postData(`chats/${chatReference}/gifs`, { link: url });
                    dangerGifs.push({ link: url });
                    return ctx.reply('succesfully');
                }

                return ctx.reply('this gif is already set as dangerous');
            }

            return ctx.reply('not a gif/sticker');
        }

        return ctx.reply('for set any gif/sticker as dangerous - use /set_danger as reply for gif/sticker');
    }

    return ctx.reply('chat is not registered, use /register_chat');
}

module.exports = setDanger;
