require('dotenv').config()
const { Telegraf } = require('telegraf');

const checkMessage = require('../handlers/check-message');
const setDangerMessages = require('../handlers/set-danger-messages');
const removeDangerMessages = require('../handlers/remove-danger-messages');
const setDanger = require('../handlers/set-danger');
const removeDanger = require('../handlers/remove-danger');

const bot = new Telegraf(process.env.BOT_TOKEN);

const dangerMessages = ['аллах'].map(item => item.toLowerCase());
const dangerGifs = [];
const dangerStickers = [];

bot.command('set_messages', (ctx) => setDangerMessages(ctx, dangerMessages));
bot.command('remove_messages', (ctx) => removeDangerMessages(ctx, dangerMessages));
bot.command('set_danger', (ctx) => setDanger(ctx, dangerGifs, dangerStickers));
bot.command('remove_danger', (ctx) => removeDanger(ctx, dangerGifs, dangerStickers));

bot.on('message', (ctx) => checkMessage(ctx, dangerMessages, dangerGifs, dangerStickers));

bot.launch();