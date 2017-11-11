var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var prefix = '!';
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
bot.on('ready', function (channelID) {
    logger.info(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels.`);
});
bot.on('message', function (user, userID, channelID, message, evt) {
    //массив пентамемов
    var AnekdotArr = ['Лупа и Пупа устроились на работу. Проработали целый месяц, трудились не покладая рук и не жалея живота своего. В конце месяца Лупа и Пупа пошли получать зарплату. В бухгалтерии все как обычно перепутали. И, в итоге, Лупа получил за Пупу, а Пупа за ЛУПУ!', 'Сидят четыре пацана на скамейке, смотрят - Димон идёт. Один из пацанов говорит: -С кем Димон первый поздоровается - тот пид@р. Все согласились. Подходит к ним Димон и говорит: -Привет пацаны!', 'Сидят мужики в баре. Один говорит: - Сейчас приду домой и разорву трусики жены! - У вас что, до сих пор такие страстные отношения? - Нет, просто натерли очень!'];
    var randomAnekdot = Math.floor(Math.random() * AnekdotArr.length);
    var getAnekdot = AnekdotArr[randomAnekdot];
    //функции чат-бота
        if (message.substring(0, 1) == prefix) {
            var args = message.substring(1).split(' ');
            var cmd = args[0];
           
            args = args.splice(1);
            switch(cmd) {
                case 'ping':
                    bot.sendMessage({
                        to: channelID,
                        message: 'Pong!'
                    });
                    break;
                case 'huy':
                    bot.sendMessage({
                        to: channelID,
                        message: 'pizda'
                    });
                    break;
                case 'pizda':
                    bot.sendMessage({
                        to: channelID,
                        message: 'huy'
                    });
                    break;
                case 'Za':
                    bot.sendMessage({
                        to: channelID,
                        message: 'lupa' 
                    });   
                    break; 
                case 'anekdot':
                	bot.sendMessage({
                		to: channelID,
                		message: getAnekdot
                	});
                    break;
             }
         }
});
