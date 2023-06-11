require('dotenv').config()
const { Telegraf } = require('telegraf');

const { postChat, getData, getChat } = require('../api/firebase');
const keepAlive = require('./server');
const clearDangerList = require('../handlers/clear-danger-list');
const checkMessage = require('../handlers/check-message');
const setDangerMessages = require('../handlers/set-danger-messages');
const removeDangerMessages = require('../handlers/remove-danger-messages');
const setDanger = require('../handlers/set-danger');
const removeDanger = require('../handlers/remove-danger');
const allowForAdmins = require('../handlers/allow-for-admins');
const giveRights = require('../handlers/give-rights');
const removeRights = require('../handlers/remove-rights');

let chatReference = '';
const isAllowForAdmins = [false];
const bot = new Telegraf(process.env.BOT_TOKEN);

const dangerMessages = [];
const dangerGifs = [];
const dangerStickers = [];
const adminsList = [];

bot.command('register_chat', async (ctx) => {
    if (!chatReference) {
        const id = String(ctx.message.chat.id).substr(1);
        const idStatus = await getChat(id);
        if (!idStatus) {
            try {
                await postChat(id);
                chatReference = id;
                return ctx.reply('успешная регистрация');
            } catch {
                return ctx.reply('unknown error (@danivjje)');
            }
        }

        chatReference = id;
        await setArrays();
        console.log(adminsList);
        return ctx.reply('успешная авторизация');
    }

    return ctx.reply('уже');
});

bot.command('allow_for_admins', (ctx) => allowForAdmins(ctx, chatReference, bot, isAllowForAdmins));
bot.command('give_rights', (ctx) => giveRights(ctx, chatReference, bot, adminsList));
bot.command('remove_rights', (ctx) => removeRights(ctx, chatReference, bot, adminsList));

bot.command('set_messages', (ctx) => setDangerMessages(ctx, dangerMessages, chatReference, bot, adminsList));
bot.command('remove_messages', (ctx) => removeDangerMessages(ctx, dangerMessages, chatReference, bot, adminsList));
bot.command('set_danger', (ctx) => setDanger(ctx, dangerGifs, dangerStickers, chatReference, bot, adminsList));
bot.command('remove_danger', (ctx) => removeDanger(ctx, dangerGifs, dangerStickers, chatReference, bot, adminsList));

bot.command('clear_messages', async (ctx) => clearDangerList(ctx, chatReference, 'messages', dangerMessages, bot));
bot.command('clear_gifs', async (ctx) => clearDangerList(ctx, chatReference, 'gifs', dangerGifs, bot));
bot.command('clear_stickers', async (ctx) => clearDangerList(ctx, chatReference, 'stickers', dangerStickers, bot));

bot.on('message', (ctx) => checkMessage(ctx, dangerMessages, dangerGifs, dangerStickers, bot, isAllowForAdmins, adminsList));
bot.launch();
keepAlive();

async function setArrays() {
    getData(`chats/${chatReference}/messages`).then(result => dangerMessages.push(...Object.values(result).slice(1)));
    getData(`chats/${chatReference}/gifs`).then(result => dangerGifs.push(...Object.values(result).slice(1)));
    getData(`chats/${chatReference}/stickers`).then(result => dangerStickers.push(...Object.values(result).slice(1)));
    getData(`chats/${chatReference}/admins`).then(result => adminsList.push(...Object.values(result).slice(1)));
    getData(`chats/${chatReference}/admin-status`).then(result => isAllowForAdmins[0] = result.status);
}