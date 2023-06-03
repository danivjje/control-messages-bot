const getGifId = require('../helpers/get-gif-id');

const checkMessage = async (ctx, dangerMessages, dangerGifs) => {
    if (ctx.message.animation) {
        const gifUrl = await getGifId(ctx);
        if (dangerGifs.includes(gifUrl)) ctx.deleteMessage(ctx.message.message_id);
    } else {
        const message = ctx.message.text.toLowerCase();
        ctx.reply(ctx.message)

        if (dangerMessages.some(item => message.search(item) !== -1)) {
            ctx.deleteMessage(ctx.message.message_id);
        }
    }
}

module.exports = checkMessage;