const Discord = require('discord.js');
const auth = require('./auth.json');
//const chat_cmd = require('./chat_commands.js');
const prefix = '!';
//инициализация бота
const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', async () => {
    console.log(`Bot has started, with ${bot.users.size - 1} users, in ${bot.channels.size} channels.`);
    //кэтч ошибок (стандарт ёпта)
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
    bot.user.setGame("read if gay");
});

bot.on('message', async message => {
    const AnekdotArr = ['Лупа и Пупа устроились на работу. Проработали целый месяц, трудились не покладая рук и не жалея живота своего. В конце месяца Лупа и Пупа пошли получать зарплату. В бухгалтерии все как обычно перепутали. И, в итоге, Лупа получил за Пупу, а Пупа за ЛУПУ!', 'Сидят четыре пацана на скамейке, смотрят - Димон идёт. Один из пацанов говорит: -С кем Димон первый поздоровается - тот пид@р. Все согласились. Подходит к ним Димон и говорит: -Привет пацаны!', 'Сидят мужики в баре. Один говорит: - Сейчас приду домой и разорву трусики жены! - У вас что, до сих пор такие страстные отношения? - Нет, просто натерли очень!'];
            let rand = Math.floor(Math.random() * AnekdotArr.length);
            let getAnekdot = AnekdotArr[rand];
            //функции чат-бота
                if(message.author.bot) return;
                if(!message.content.startsWith(prefix)) return;
                //отделение символа длиной в префикс а затем неведомая хуйня
                let messageArray = message.content.slice(prefix.length).trim().split(' ');
                let command = messageArray.shift().toLowerCase();
                    //свич(нинтендо) на команды чата
                    switch(command) {
                        //тест эмбедов (хз чё это)
                        case 'userinfo':
                            let embed = new Discord.RichEmbed()
                                    .setAuthor(message.author.username)
                                    .setDescription("He is so dumb, LOL!")
                                    .setColor("#00ff00")
                                    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
                                    .addField("ID", message.author.id)
                                    .addField("Created At", message.author.createdAt);
                                if(message.author.discriminator == 4832) embed.addField("А этот ещё и пидор", "И это точно");
                                message.channel.send(embed);
                                break;
                            case 'ping':
                                message.channel.send('Pong!');
                                break;
                            case 'pong':
                                message.channel.send('Idi nahuy');
                                break;
                            case 'channelinfo':
                                message.channel.send(`There are ${bot.users.size - 1} users, in ${bot.channels.size} channels.`);   
                                break;     
                            case 'za':
                                message.channel.send('lupa');   
                                break;  
                            case 'anekdot':
                                message.channel.send(getAnekdot);
                                break;
                            case 'say':
                                const sayMessage = messageArray.join(' ');
                                // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
                                message.delete().catch(O_o=>{}); 
                                // And we get the bot to say the thing: 
                                message.channel.send(sayMessage);
                                break;
                                }
});
//логин
bot.login(auth.token);