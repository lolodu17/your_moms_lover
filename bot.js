var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var chat = require('./chat_commands.js');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function () {
    logger.info(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels.`);
});
bot.on('message', function (user, userID, channelID, message, evt) {
     if (message.substring(0, 1) == '!') {
            var args = message.substring(1).split(' ');
            var cmd = args[0];
           
            args = args.splice(1);
            switch(cmd) {
                // !ping
                case 'ping':
                    bot.sendMessage({
                        to: channelID,
                        message: 'Pong!'
                    });
                case 'huy':
                    bot.sendMessage({
                        to: channelID,
                        message: 'pizda'
                    });
                case 'pizda':
                    bot.sendMessage({
                        to: channelID,
                        message: 'huy'
                    });
                break;
                // Just add any case commands if you want to..
             }
         }
});