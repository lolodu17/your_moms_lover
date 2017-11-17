const Discord = require('discord.js');
const auth = require('./auth.json');
const anti_spam = require("./anti_spam");
const chat_cmd = require('./chat_commands.js');
const ready_state = require('./ready.js');
const test_js = require('./test.js');

//инициализация бота
const bot = new Discord.Client({disableEveryone: true});

ready_state(bot);

anti_spam(bot, {});

chat_cmd(bot, {
    clear: 1,
    user_info: 1,
    ping_old: 1,
    pong: 1,
    guild_info: 1,
    za: 1,
    count: 1,
    anekdot: 1,
    say: 1,
    ping: 1,
    kick: 1,
    vote: 1
});

//логин
bot.login(auth.token);