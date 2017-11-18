let poll_started = false;   //флаг голосования
let messageArray;           //сообщение из чата
let cmd;                    //команда
let tag;                    //счётчик ответивших

const prefix = '!';
const Discord = require('discord.js');

let vots = Array(25).fill(0);   //массив голосов
let answerers = [];             //ид ответчиков
let opt = [];                   //варианты

module.exports = function(bot) {

    bot.on('message', message => {

        if(message.channel.type != 'dm'){

            if(message.author.bot) return;
            if(!message.content.startsWith(prefix)) return;
                
            messageArray = message.content.slice(prefix.length).trim().split(' ');
            cmd = messageArray.shift().toLowerCase();
            switch(cmd){
                    case 'poll':

                        if(poll_started === false){

                            poll_started = true;
                            
                            let beg = 0;
                            let en  = 1;
                            tag     = 0;

                            let theme  = `${messageArray.shift()}`;

                            if(theme === 'undefined'){
                                message.channel.send("Формат вызова опроса: !poll Ты-гей-или-да? Да Нет Возможно ( - = видимый пробел)");
                                poll_started = false;
                                return;
                            }

                            if(messageArray.slice(0, 1) == ''){
                                message.channel.send("Укажи хотя бы 1 вариант ответа");
                                poll_started = false;
                                return;
                            }

                            if(messageArray.slice(5, 6) != ''){
                                message.channel.send("Недопустимое количество вариантов ответа, максимум - 5");
                                poll_started = false;
                                return;
                            }

                            let voting = new Discord.RichEmbed()
                                .setAuthor(message.author.username)
                                .setDescription("Запустил голосование")
                                .setColor("#00ff00")
                                .addField("Тема", theme);

                            while(messageArray.slice(beg, en) != ''){

                                opt[beg] = messageArray.slice(beg, en).join(' ');
                                voting.addField(`!vote ${en}`, opt[beg]);
                                beg++;
                                en++;

                            }

                            message.channel.send(voting);
                        } 

                        else {
                            message.channel.send('В данный момент запущено другое голосование');
                        }

                    break;

                    case 'vote':

                        if (poll_started === true && !answerers.includes(message.author.id) ) {

                            answerers[tag] = message.author.id;
                            tag++;

                            let answer = messageArray.slice(0, 1).join(' ');

                            if(answer > opt.length) { 
                                message.channel.send('Нет такого ответа, ПИДРИЛА ЕБАНАЯ');
                                answerers[tag - 1] = null;
                                return;
                            }

                            vots[answer - 1]++;

                            message.channel.send('Твой голос учтён, пуся');

                            }

                    break;

                    case 'end_poll':
                        if(poll_started === true) {

                            let result = vots[0] + vots[1] + vots[2] + vots[3] + vots[4];

                            let final_embed = new Discord.RichEmbed()
                                .setColor("#00ff00")
                                .addField('Результат', result_generator(opt, vots, result));

                            message.channel.send(final_embed);

                            poll_started === false;

                        }
                    break;
            }
        }
    });
}


function result_generator(opt, vots, result) {

    let results = [];
    for (var i = 0; i < opt.length; i++) {
        results[i] = `${opt[i]} - ${(vots[i] / result) * 100}% или ${vots[i]} голосов\n`;
    }
    
    return results;
}