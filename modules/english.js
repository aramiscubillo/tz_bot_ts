'use strict';
module.exports = (bot) => {

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('54deaf3594b0036ccc7627580f124c16');
	

	
bot.on('postback:EN', (payload, chat) => {


	chat.say({
			attachment: 'image',
			url: 'https://firebasestorage.googleapis.com/v0/b/mail-assets.appspot.com/o/tz%2Fbigotes.jpeg?alt=media&token=9491abdf-89b1-41bc-90ea-c03d694d1bdb'
			
		}).then(() => {	
			
			var text = "Hi :) my name is Bigotes. Lya y Alvaro train me to use facebook. What can I do for you?";
			
			sayQR(text, chat, 1000, 'Intro');
		
	},{ typing: 1000 });
});

	
//menu
bot.hear([	
			'Menu En'
		], (payload, chat) => {
			
		sayQR('Menu', chat,  true, 'Menu');
});


	
//Hi
bot.hear([	
			/^(?=.*\bhi\b).*$/gim,
			/^(?=.*\bhello\b).*$/gim
		], (payload, chat) => {
		
		sayQR('Hi :)', chat, true, 'Other');
});

//Thanks
bot.hear([	
			/^(?=.*\bThanks\b).*$/gim
		], (payload, chat) => {		
		sayQR("You're welcome", chat, true, 'Other');
});

//Adios
bot.hear([	
			/^(?=.*\bbye\b).*$/gim
		], (payload, chat) => {
			
		sayQR('bye :)', chat, true, 'Other');
});


//Visitas 
bot.hear([	'Visits',
			/^(?=.*\bwal(k|ks)\b)(?!.*\bvolunteering\b)(?!.*\bvolunteer\b).*$/gim,
			/^(?=.*\btrave(l|ling)\b)(?!.*\bvolunteering\b)(?!.*\bvolunteer\b).*$/gim,
			/^(?=.*\bvisi(t|s)\b)(?!.*\bvolunteering\b)(?!.*\bvolunteer\b).*$/gim,
			 /^(?=.*\bgo\b)(?!.*\bvolunteering\b)(?!.*\bvolunteer\b).*$/gim,
		], (payload, chat) => {
	
	var text = "Please go to the following link to know everything about the visits to Territorio de Zaguates: http://www.territoriodezaguates.com/visitas/";
	
	sayQR(text, chat, true, 'Visitas');
	
});


//ubicacion finca
bot.hear([	/^(?=.*\blocation\b).*$/gim,
			/^(?=.*\baddress\b).*$/gim,
			/^(?=.*\bdirection\b).*$/gim,
			/^(?=.*\blocated\b).*$/gim
		], (payload, chat) => {
	
	
	chat.say("You can find all the details to get to the farm in the following link: http://www.territoriodezaguates.com/visitas/#donde").then(()=>{
		
		sayQR(":)", chat, true, 'Visitas 2');
		
	},{ typing: 3000 });
	
});

//waze
/*bot.hear([	/^(?=.*\bwaze\b).*$/gim,
			/^(?=.*\bgps\b).*$/gim
		], (payload, chat) => {
	
	chat.say("Waze: Territorio de Zaguates http://waze.to/lr/hd1u1mn0fm", { typing: true });
	
});*/

//Donaciones (?=.*\bno pas(ó|o))
bot.hear([	
			/^(?!.*\bproble(m|ms)\b)(?!.*\bdon(t|\'t) understand\b)(?!.*\bdon(t|\'t) know\b)(?!.*\berror\b)(?!.*\bunable\b)(?!.*\bpaypal\b)(?!.*\bpay pal\b\b)(?=.*\bdonate\b).*$/gim,
			/^(?!.*\bproble(m|ms)\b)(?!.*\bdon(t|\'t) understand\b)(?!.*\bdon(t|\'t) know\b)(?!.*\berror\b)(?!.*\bunable\b)(?!.*\bpaypal\b)(?!.*\bpay pal\b\b)(?=.*\bdonating\b).*$/gim,
			/^(?!.*\bproble(m|ms)\b)(?!.*\bdon(t|\'t) understand\b)(?!.*\bdon(t|\'t) know\b)(?!.*\berror\b)(?!.*\bunable\b)(?!.*\bpaypal\b)(?!.*\bpay pal\b\b)(?=.*\bdonation\b).*$/gim,
			'Donations'
		], (payload, chat) => {
	
	var text = "You can make a donation through the platform Treeseed.org. It allows you to sponsor a mutt every month and the charge is generated automatically. It also allows you to donate only once. Enter the following link to go to Treeseed: https://goo.gl/zTkndW";
	
	sayQR(text, chat, true, 'Donaciones');
	
});


//Error al donar
bot.hear([	/^(?=.*\bproble(m|ms)\b\b)(?=.*\bdonate\b).*$/gim,
			/^(?=.*\berror\b\b)(?=.*\bdonate\b).*$/gim,
			/^(?=.*\bproble(m|ms)\b\b)(?=.*\bdonation\b).*$/gim,
			/^(?=.*\berror\b\b)(?=.*\bdonation\b).*$/gim,
			/^(?=.*\bproble(m|ms)\b\b)(?=.*\bdonating\b).*$/gim,
			/^(?=.*\berror\b\b)(?=.*\bdonating\b).*$/gim,
		], (payload, chat) => {
	
	var text = "Pleace enter the following link and send a message to Treeseed for help: https://www.facebook.com/treeseed.org/";
	
	sayQR(text, chat, true, 'Error donacion');
});


//como donar?
bot.hear([	
			/^(?=.*\bdon(t|\'t) understand\b\b)(?=.*\bdonate\b).*$/gim,
			/^(?=.*\bdon(t|\'t) know\b\b)(?=.*\bdonate\b).*$/gim,
			/^(?=.*\bunable\b\b)(?=.*\bdonate\b).*$/gim,
			/^(?=.*\bdon(t|\'t) understand\b\b)(?=.*\bdonation\b).*$/gim,
			/^(?=.*\bdon(t|\'t) know\b\b)(?=.*\bdonation\b).*$/gim,
			/^(?=.*\bunable\b\b)(?=.*\bdonation\b).*$/gim,
			/^(?=.*\bdon(t|\'t) understand\b\b)(?=.*\bdonating\b).*$/gim,
			/^(?=.*\bdon(t|\'t) know\b\b)(?=.*\bdonating\b).*$/gim,
			/^(?=.*\bunable\b\b)(?=.*\bdonating\b).*$/gim,
		], (payload, chat) => {
	
	
	mixpanelReg('How to donate');
	
	chat.say({
		text: 'With which type of donation you are having problems with? Donate once? Monthly? ¿Other?',
		quickReplies: [
				{
					"content_type":"text",
					"title":"-Once",
					"payload":"EN_DON_SIMPLE"
				},
				{
					"content_type":"text",
					"title":"-Monthly",
					"payload":"EN_DON_MENS"
				},
				{
					"content_type":"text",
					"title":"-Other",
					"payload":"EN_DON_MENS"
				}
		
		]
	});
	
});
//Problemas donación simple

bot.hear([	'-Once'
		], (payload, chat) => {
	
	mixpanelReg('-Simple');
	
	chat.say("To donate once you must follow these steps: \n1-Enter to Treeseed.org. \n2-If the page is in spanish, click where it says \"ES\" in the header of the page and change it to English. \n3-Click where it says \"Or Donate Once\".\n4-Fill in the basic information to create an account on Treeseed.org.\n6-Enter the card information, the amount you want wish to donate and click \"Donate \"", { typing: true });
});

//Problemas donación simple
bot.hear([	'-Monthly'
		], (payload, chat) => {
	
	mixpanelReg('-Mensual');
	
	chat.say("To sponsor a dog each month you must follow these steps: \n1-Enter to Treeseed.org. \n2-If the page is in English, click where it says \"ES\" in the header of the page and change it to english. \n3-Click the \"Donate Monthly\" button. \ N4-Select the monthly plan you wish to help with. The charge happens every month and is automatic. \n5-Click the \"Next\" button and fill out the basic information to create an account at Treeseed.org. \n6-Enter the card information and click \"Donate \"", { typing: true });
});

//Problemas donación simple
bot.hear([	'-Other',
			'Contact'
		], (payload, chat) => {
	
	var text = "Write us with your problem at: info@territoriodezaguates.com";
	
	sayQR(text, chat, true, 'Contacto');
});



//patrocinar zaguate
bot.hear([	/^(?=.*\bsponsor\b).*$/gim
		], (payload, chat) => {
	
	var text = "To sponsor a dog each month you must follow these steps: \n1-Enter to Treeseed.org. \n2-If the page is in English, click where it says \"ES\" in the header of the page and change it to english. \n3-Click the \"Donate Monthly\" button. \n4-Select the monthly plan you wish to help with. The charge happens every month and is automatic. \n5-Click the \"Next\" button and fill out the basic information to create an account at Treeseed.org. \n6-Enter the card information and click \"Donate\"";
	
	sayQR(text, chat, true, 'Patrocinar');
	
});

//donación unica
bot.hear([	/^(?=.*\bdonate\b\b)(?=.*\bonce\b).*$/gim,
			/^(?=.*\bdonation\b\b)(?=.*\bsimple\b).*$/gim,
			/^(?=.*\bdonation\b\b)(?=.*\bone time\b).*$/gim,
		], (payload, chat) => {
	
	var text = "To donate once you must follow these steps: \ n \ n1-Enter to Treeseed.org. \ N2-If the page is in spanish, click where it says \"ES \" in the header of the page and change it to English. \ N3-Click where it says \"Or Donate Once \". \ N4-Fill in the basic information to create an account on Treeseed.org. \ N6-Enter the card information, the amount you want wish to donate and click \"Donate \"";
	
	sayQR(text, chat, true, 'Donacion unica');
	
});




//Cuentas bancarias
bot.hear([	/^(?=.*\bbank account\b\b)(?=.*\baccoun(t|ts)\b).*$/gim
		], (payload, chat) => {
			
	var text = "Please enter the following link to know all the details of our bank accounts: https://www.facebook.com/territoriodezaguates/app/208195102528120/";
	
	sayQR(text, chat, true, 'Cuentas Banco');
	
});


//Voluntariado Quiero ser voluntaria, como hago?
bot.hear([	/^(?=.*\bvolunteer\b).*$/gim,
			/^(?=.*\bvolunteering\b).*$/gim,
			/^(?=.*\bjo(b|bs)\b).*$/gim,
			'Volunteer'
		], (payload, chat) => {
		
	var text="Thank you for your interest in helping Territory of Zaguates and being part of our tribe. To be a volunteer you must fill out a form and then we will contact you by email. \ NTo complete the form you must go to the following link: https://goo.gl/RTgdVH";
	
	sayQR(text, chat, true, 'Voluntariado');
});


//Adopciones
bot.hear([	/^(?=.*\badoption\b).*$/gim,
			/^(?=.*\badopt\b).*$/gim,
			/^(?=.*\badoptions\b).*$/gim,
			'Adopt'
		], (payload, chat) => {
	
	var text = "Please enter the following link to know all the details to adopt a mutt: http://www.territoriodezaguates.com/info/adopciones/";
	
	sayQR(text, chat, true, 'Adopciones');
	
});


//paseos cancelados por clima
bot.hear([	/^(?=.*\brain\b\b)(?=.*\bwal(k|ks)\b).*$/gim,
			/^(?=.*\bweather\b\b)(?=.*\bwal(k|ks)\b).*$/gim,
			/^(?=.*\bcancelled\b\b)(?=.*\bwal(k|ks)\b).*$/gim
		], (payload, chat) => {
	
	var text = "In case the tour is canceled, we will notify through our facebook";
	
	sayQR(text, chat, true, 'Visitas clima');
	
});





//encontrarle hogar a perro
bot.hear(['Drop off dog'
		], (payload, chat) => {
	
	
	chat.say("We can not receive more dogs but we will gladly help you find him a home by posting the information on our page the page.").then(()=>{
		
		chat.say("What you have to do is write a post on you facebook profile using the hastag #TerritorioComparte and tag us, then we will share it on our page.").then(()=>{
		
			chat.say("The post needs to have the following:\n1-Pictures. \n2-Information or story of the dog\n3-You phone number so the people interested in the dog can contact you").then(()=>{
		
				chat.say("Don't forget the hashtag #TerritorioComparte and tag us when you do the post and also make it public:").then(()=>{
		
					chat.say({
						attachment: 'image',
						url: 'https://firebasestorage.googleapis.com/v0/b/mail-assets.appspot.com/o/tz%2FrecibimientoPerros2.png?alt=media&token=e99f2b07-0c17-4056-9fdf-d6d8a17a4966'
						
					});
					
					setTimeout(function(){ 
					sayQR('Menu', chat, true, 'Recibir perro');
				}, 6000);
					
				},{ typing: 2000 });
			
			
			},{ typing: 1000 });
			
			
		},{ typing: 1000 });
		
		
	},{ typing: true });
	
});


function say(text, chat, vTyping){
	chat.say(text, { typing: vTyping });
}


function sayQR(vText, chat, vTyping, action){
	mixpanelReg(action);
	
	chat.say({
				text: vText,
				quickReplies: quickreplies()
			}); 
}

function mixpanelReg(action){
	mixpanel.track(action, {
		lang: 'es'
	});
}


function quickreplies(){
	return ['Visits', 'Donations','Adoptions', 'Volunteer','Drop off dog', 'Contact'];
}


  
};
