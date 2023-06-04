const getFileId = require('../helpers/get-file-id');

const checkMessage = async (ctx, dangerMessages, dangerGifs, dangerStickers) => {
    if (ctx.message.animation) {
        const gifUrl = await getFileId(ctx, 'gif');
        if (dangerGifs.includes(gifUrl)) {
            return ctx.deleteMessage(ctx.message.message_id);
        }
    }

    if (ctx.message.sticker) {
        const stickerUrl = await getFileId(ctx, 'sticker');
        if (dangerStickers.includes(stickerUrl)) {
            return ctx.deleteMessage(ctx.message.message_id);
        }
    }

    if (ctx.message.text) {
        const message = ctx.message.text.toLowerCase();
        if (dangerMessages.some(item => message.search(item) !== -1)) {
            return ctx.deleteMessage(ctx.message.message_id);
        }
    }
}

module.exports = checkMessage;