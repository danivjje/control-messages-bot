const getGifId = require('../helpers/get-gif-id');

const setDangerGif = (ctx, dangerGifs) => {
    if (ctx.message.reply_to_message) {
        const url = getGifId(ctx, true);
        dangerGifs.push(url);
        ctx.reply('succesfully');
    }
}

module.exports = setDangerGif;