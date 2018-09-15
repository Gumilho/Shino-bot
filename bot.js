
const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
var db = [];
const config = require("./config.json");
bot.login("NDg5NTg2NTc3MTYxNTg0NjQx.Dns84g.gS-FOe74yhUZUYg7J6CwwM7t1zY");
bot.on('ready',function(){
    console.log("ready");
    var channel = bot.channels.find(x => x.name == 'safe-cuties');
    channel.fetchMessages({ limit: 100 })
        .then(messages => console.log(`Updated ${messages.size} messages from safe-cuties`))
        .catch(console.error);
    channel = bot.channels.find(x => x.name == 'pin-worthy-cuties');
    channel.fetchMessages({ limit: 100 })
        .then(messages => console.log(`Updated ${messages.size} messages from pin-worthy-cuties`))
        .catch(console.error);
});

bot.on('messageReactionAdd', react => {
    var ct = react.count;
    var id = react.emoji.id;
    var ur = react.message.attachments.first().url;
    //console.log(id);
    var att = new Discord.Attachment(ur);
    //console.log('aaa');
    const channel = bot.channels.find(x => x.name === config.targetChannel);
    if(id === config.emoteID && ct >= config.emoteCount){
    	fs.readFile("att.json", 'utf8', function(err,data){
		if(err) return console.log(err);
		db = JSON.parse(data);
        //console.log(db);
		if(db.indexOf(ur) != -1) return;
		channel.send(att);
		db.push(ur);
        	fs.writeFile("att.json", JSON.stringify(db), function(err) {
            	if(err) return console.log(err);
	    	    console.log('database updated');
    		});
    	});
    }
});
