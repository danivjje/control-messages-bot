require('dotenv').config();

const getGifId = async (ctx, file, replyStatus = false) => {
    let id = '';

    const msg = file === 'gif' ? 'animation' : 'sticker';

    if (replyStatus) id = ctx.message.reply_to_message[msg].file_id;
    else id = ctx.message[msg].file_id;

    const fileInfo = await ctx.telegram.getFile(id);
    const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`;

    return url;
}

module.exports = getGifId;