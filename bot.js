var Discord = require('discord.js');
var auth = require('./auth.json');
var prefix = '!';
//инициализация бота
var bot = new Discord.Client({disableEveryone: true});

bot.on('ready', async () => {
    console.log(`Bot has started, with ${bot.users.size - 1} users, in ${bot.channels.size} channels.`);
    //кэтч ошибок (стандарт ёпта)
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.on('message', async message => {
    //массив пентамемов
    var AnekdotArr = ['Лупа и Пупа устроились на работу. Проработали целый месяц, трудились не покладая рук и не жалея живота своего. В конце месяца Лупа и Пупа пошли получать зарплату. В бухгалтерии все как обычно перепутали. И, в итоге, Лупа получил за Пупу, а Пупа за ЛУПУ!', 'Сидят четыре пацана на скамейке, смотрят - Димон идёт. Один из пацанов говорит: -С кем Димон первый поздоровается - тот пид@р. Все согласились. Подходит к ним Димон и говорит: -Привет пацаны!', 'Сидят мужики в баре. Один говорит: - Сейчас приду домой и разорву трусики жены! - У вас что, до сих пор такие страстные отношения? - Нет, просто натерли очень!'];
    var randomAnekdot = Math.floor(Math.random() * AnekdotArr.length);
    var getAnekdot = AnekdotArr[randomAnekdot];
    //функции чат-бота
        if(message.author.bot) return;
        if(message.content.indexOf(prefix) !== 0) return;
        //отделение символа длиной в префикс а затем неведомая хуйня
        let messageArray = message.content.slice(prefix.length).trim().split(/ !/g);
        let command = messageArray.shift().toLowerCase();
            //свич(нинтендо) на команды чата
            switch(command) {
                //тест эмбедов (хз чё это)
                case 'userinfo':
                    let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username)
                        .setDescription("He is so dumb, LOL!");
                    message.channel.send(embed);
                    break;
                case 'ping':
                    message.channel.send('Pong!');
                    break;
                case 'huy':
                    message.channel.send('pizda');
                    break;
                case 'pizda':
                    message.channel.send('huy');
                    break;
                case 'Za':
                    message.channel.send('lupa');   
                    break; 
                case 'anekdot':
                	message.channel.send(getAnekdot);
                    break;
             }
        
});
//логин
bot.login(auth.token);