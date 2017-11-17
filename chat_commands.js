const prefix = '!';
let i = 0;

module.exports = function(bot, options) {
    //options
    const clear = options.clear || 0;
    const user_info = options.user_info || 0;
    const ping_old = options.ping_old || 0;
    const pong = options.pong || 0;
    const guild_info = options.guild_info || 0;
    const za = options.za || 0;
    const count = options.count || 0;
    const anekdot = options.anekdot || 0;
    const say = options.say || 0;
    const ping = options.ping || 0;
    const kick = options.kick || 0;

    bot.on('message', async message => {
        const AnekdotArr = ['Лупа и Пупа устроились на работу. Проработали целый месяц, трудились не покладая рук и не жалея живота своего. В конце месяца Лупа и Пупа пошли получать зарплату. В бухгалтерии все как обычно перепутали. И, в итоге, Лупа получил за Пупу, а Пупа за ЛУПУ!', 'Сидят четыре пацана на скамейке, смотрят - Димон идёт. Один из пацанов говорит: -С кем Димон первый поздоровается - тот пид@р. Все согласились. Подходит к ним Димон и говорит: -Привет пацаны!', 'Сидят мужики в баре. Один говорит: - Сейчас приду домой и разорву трусики жены! - У вас что, до сих пор такие страстные отношения? - Нет, просто натерли очень!'];
        let rand = Math.floor(Math.random() * AnekdotArr.length);
        let getAnekdot = AnekdotArr[rand];

        //проверки правильности команды
        //if(message.channel.type === 'dm') return;
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        //взятие текста сообщения и превращение его в массив БЕЗ "!"
        let messageArray = message.content.slice(prefix.length).trim().split(' ');
        //отдельно взятие текста комманды
        let command = messageArray.shift().toLowerCase();
 
        //свич(нинтендо) на команды чата
        switch(command) 
        {
            case 'clear':
            if(clear == 1) {
                // This command removes all messages from all users in the channel, up to 100.
                
                // get the delete count, as an actual number.
                const deleteCount = parseInt(messageArray[0], 10);
                
                // Ooooh nice, combined conditions. <3
                if(!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Укажи что-то между 2 и 100, nigga");
                
                // So we get our messages, and delete them. Simple enough, right?
                const fetched = await message.channel.fetchMessages({count: deleteCount});
                message.channel.bulkDelete(fetched)
                    .catch(error => message.reply(`Чет я не могу, вот отмазка: ${error}`));
            }
            break;

            //юзер инфо через эмбед (ну такая табличка с редактируемым количеством полей и цветной полоской слева)
            case 'user_info':
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

            case 'ping_old':
                message.channel.send('Pong!');
            break;

            case 'pong':
                message.channel.send('idi nahuy');
            break;

            case 'guild_info':
                message.channel.send(`В помойке ${bot.users.size - 1} пользователей, и сидят они в ${bot.channels.size} каналах. Хозяин помойки - ${message.guild.owner}`);
            break; 

            case 'za':
                message.channel.send('lupa');
            break;

            case 'count':
                while (1) {
                    message.channel.send(i);
                    i = i + 1;
                }
            break;

            case 'anekdot':
                message.channel.send(getAnekdot);
            break;

            //хитрая функция, выводит сообщение, которое идёт в чате после команды а оригинальное сообщение УДАЛЯЕТ
            case 'say':
                const sayMessage = messageArray.join(' ');
                // join соединяет элементы массива через сепаратор
                message.delete().catch(O_o=>{});  
                message.channel.send(sayMessage);
            break;

            case 'ping':
                // Разница между отправкой сообщения и его редактированием
                // Второе значение - время отправки ботом данных на сервер (односторонний пинг с веб-сокетом**)
                const m = await message.channel.send("Хммм");
                m.edit(`Понг, блядь, иди нахуй! Твоя задержка - ${m.createdTimestamp - message.createdTimestamp}мс. Задержка АРИ - ${Math.round(bot.ping)}мс`);
            break;

            case 'kick':
                // This command must be limited to mods and admins. In this example we just hardcode the role names.
                // Please read on Array.some() to understand this bit: 
                // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
                if(!message.member.roles.some(r=>["Батя"].includes(r.name)) )
                    return message.reply("Сори, брат, ты для этого слишком ЛОУ!");
    
                // Let's first check if we have a member and if we can kick them!
                // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
                let member = message.mentions.members.first();
                if(!member)
                    return message.reply("Эй йо, такого нигги нет на сервер, подумай ещё (указывать надо через @");
                if(!member.kickable) 
                    return message.reply("Чёт пошло не так, походу прав не хватает");
    
                // slice(1) removes the first part, which here should be the user mention!
                let reason = messageArray.slice(1).join(' ');
                if(!reason)
                    return message.reply("Поясни за базар");
    
                // Now, time for a swift kick in the nuts!
                await member.kick(reason)
                    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
                message.reply(`${member.user.tag} был выпнут из помойки по приказу ${message.author.tag} потому что, цитирую: ${reason}`);
            break;

            case 'set_afk':
                let chan = new Channel;
                chan.id = messageArray[1];
                message.guild.setAFKChannel(chan)
                    .then(message.channel.send(`Updated guild AFK channel to ${message.guild.afkChannel}`))
                    .catch(console.error);
            break;
            vote
        }
    });
}