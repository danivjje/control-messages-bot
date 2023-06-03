require('dotenv').config()
const { Telegraf } = require('telegraf');

const checkMessage = require('../handlers/check-message');
const setDangerMessages = require('../handlers/set-danger-messages');
const removeDangerMessages = require('../handlers/remove-danger-messages');
const setDangerGif = require('../handlers/set-danger-gif');
const removeDangerGif = require('../handlers/remove-danger-gif');

const bot = new Telegraf(process.env.BOT_TOKEN);

const dangerMessages = ['аллах'].map(item => item.toLowerCase());
const dangerGifs = [];

bot.command('set_messages', (ctx) => setDangerMessages(ctx, dangerMessages));
bot.command('remove_messages', (ctx) => removeDangerMessages(ctx, dangerMessages));
bot.command('set_gif', (ctx) => setDangerGif(ctx, dangerGifs));
bot.command('remove_gif', (ctx) => removeDangerGif(ctx, dangerGifs));
bot.on('message', (ctx) => checkMessage(ctx, dangerMessages, dangerGifs));

bot.launch();