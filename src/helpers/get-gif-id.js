require('dotenv').config();

const getGifId = async (ctx, replyStatus = false) => {
    let id = '';

    if (replyStatus) id = ctx.message.reply_to_message.animation.file_id;
    else id = ctx.message.animation.file_id;

    const fileInfo = await ctx.telegram.getFile(id);
    const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`;

    return url;
}

module.exports = getGifId;