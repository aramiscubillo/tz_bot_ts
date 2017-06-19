'use strict';
module.exports = (bot) => {
	
	var Mixpanel = require('mixpanel');
	var mixpanel = Mixpanel.init('54deaf3594b0036ccc7627580f124c16');
	
  bot.on('message', (payload, chat, data) => {
    const text = payload.message.text;
    if (data.captured) { return; }
	
	mixpanel.track('Echo');
	setTimeout(function(){ 
		chat.say({text:'\n\nEnglish: Please select an option from the menu',
				quickReplies: ['Menu Esp', 'Menu En']
	}, 500);
	
    chat.say('Por favor selecciona una opción del menú');
	
	 
	
	});
	
  });
};
