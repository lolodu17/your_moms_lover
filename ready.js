module.exports = function (bot) {
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
}