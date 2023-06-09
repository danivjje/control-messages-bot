const getFileId = require('../helpers/get-file-id');
const checkStatus = require('../helpers/check-status');

const checkMessage = async (ctx, dangerMessages, dangerGifs, dangerStickers, bot, isAllowForCreator) => {

    if (isAllowForCreator[0]) {
        const isCreator = await checkStatus(ctx, bot);
        if (!isCreator) check();
    } else check();

    async function check() {
        if (ctx.message.animation) {
            const gifUrl = await getFileId(ctx, 'gif');
            if (dangerGifs.some(item => item.link === gifUrl)) {
                return ctx.deleteMessage(ctx.message.message_id);
            }
        }

        if (ctx.message.sticker) {
            const stickerUrl = await getFileId(ctx, 'sticker');
            if (dangerStickers.some(item => item.link === stickerUrl)) {
                return ctx.deleteMessage(ctx.message.message_id);
            }
        }

        if (ctx.message.text) {
            const message = ctx.message.text.toLowerCase();
            if (dangerMessages.some(item => message.search(item.title) !== -1)) {
                return ctx.deleteMessage(ctx.message.message_id);
            }
        }
    }
}

module.exports = checkMessage;