'use strict';
const BootBot =  require('bootbot');
const config = require('config');
const echoModule = require('./modules/echo');
const english = require('./modules/english');

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('54deaf3594b0036ccc7627580f124c16');

const bot = new BootBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});


// Setting this to true would disable the text input on mobile
// and the user will only be able to communicate via the persistent menu.
const disableInput = true;

bot.module(echoModule);
bot.module(english);

bot.setGreetingText("Da clic en el botón Empezar. Click the button Get Stated")
bot.setGetStartedButton("GET_STARTED")


bot.setPersistentMenu(
[
    {
      "locale":"default",
	  "composer_input_disabled":true,
      "call_to_actions":[
        {
          "type":"postback",
          "title":"Español",
          "payload":"ES"
        },
		{
          "type":"postback",
          "title":"English",
          "payload":"EN"
        }
      ]
    }
  ]
, disableInput);


bot.on('postback:GET_STARTED', (payload, chat) => {
	
		mixpanel.track('Start');
		
	  chat.say({
		text: 'Seleciona un idioma. \n Select a language',
		buttons: [
			{ type: 'postback', title: 'English', payload: 'EN' },
			{ type: 'postback', title: 'Español', payload: 'ES' }
		]
	});
});

function quickreplies(){
	return ['Adopciones', 'Visitas', 'Alimento', 'Donaciones', 'Perro perdido', 'Recibir perro', 'Voluntariado', 'Contacto', 'Productos', 'Alcancias'];
}

//Hi
bot.on('postback:ES', (payload, chat) => {
	
	chat.say({
			attachment: 'image',
			url: 'https://firebasestorage.googleapis.com/v0/b/mail-assets.appspot.com/o/tz%2Fbigotes.jpeg?alt=media&token=9491abdf-89b1-41bc-90ea-c03d694d1bdb'
			
		}).then(() => {	
			
			var text = 	"Hola :) soy Bigotes un perro robot. Lya y Alvaro me entrenaron para usar facebook y porque nos escriben muchos mensajes al día. Selecciona la opción con la que quieres que te ayude."		
					
			sayQR(text, chat, true, 'Intro' );		
		
	},{ typing: 1000 });
});


//menu
bot.hear([	
			'Menu Esp'
		], (payload, chat) => {
		
		sayQR('Menú', chat, true, 'Menu');
		
});


//Hi

bot.hear([	
			'hola'
		], (payload, chat) => {
			
		sayQR("Hola :)", chat, true, 'Other');
});



//Gracias
bot.hear([	
			'gracias',
			'muchas gracias'
		], (payload, chat) => {

		sayQR("Con gusto", chat, true, 'Other');
});

//Adios
bot.hear([	
			'adios',
			'adiós'
		], (payload, chat) => {
			
		sayQR("Adiós", chat, true, 'Other');
});



bot.hear([	/^(?=.*\bpastillas\b).*$/gim,
			/^(?=.*\bnexgard\b).*$/gim,
		], (payload, chat) => {
	
		var text = "Para obtener más información de la venta de productos, ingresá en el siguiente enlace: http://www.territoriodezaguates.com/info/alimentos/";
		
		sayQR(text, chat, true, 'Pastillas');
	
});

//Visitas  
bot.hear([	'Visitas',
			/^(?=.*\bcaminat(a|as)\b).*$/gim,
			/^(?=.*\bpase(o|os)\b).*$/gim,
		], (payload, chat) => {
	
	var text = "Puedes ingresar al siguiente enlace para saber todo acerca de las visitas a la finca: http://www.territoriodezaguates.com/visitas/";
	
	sayQR(text, chat, true, 'Visitas');
	
	
	
});

//ir a la finca
bot.hear([	
			/^(?=.*\bir\b)(?=.*\bfinca\b).*$/gim,
			/^(?=.*\bir\b)(?=.*\bver\b)(?=.*\bperros\b).*$/gim,
			/^(?=.*\bir\b)(?=.*\bver\b)(?=.*\bzaguates\b).*$/gim,
			/^(?=.*\bir\b)(?=.*\bver\b)(?=.*\bpeluditos\b).*$/gim
		], (payload, chat) => {
	

	chat.say("No tenemos horarios de visitas establecidos, la finca permanece cerrada por muchísimas razones. Pero hacemos unos paseos abiertos para que todos puedan venir a conocer, visitar y estar con todos los zaguates(incluyendome).").then(()=>{
		
		var text = "Puedes ingresar al siguiente enlace para saber todo acerca de las visitas a la finca: http://www.territoriodezaguates.com/visitas/";
		
		
		sayQR(text, chat, true, 'Visitas 2');
		
	},{ typing: 3000 });
	
});

//ubicacion finca
bot.hear([	/^(?=.*\bd(o|ó)nde\b)(?=.*\bubicad(a|o|os)\b).*$/gim,
			/^(?=.*\bd(o|ó)nde\b)(?=.*\bfinca\b).*$/gim,
			/^(?=.*\bc(o|ó)mo\b)(?=.*\blleg(a|ar)\b).*$/gim,
			/^(?=.*\bc(o|ó)mo\b)(?=.*\blleg(o|amos)\b).*$/gim,
			/^(?=.*\bforma\b)(?=.*\bllegar\b).*$/gim,
			/^(?=.*\bd(o|ó)nde\b)(?=.*\blocalizados\b).*$/gim
		], (payload, chat) => {
	
	
	chat.say("Todos los detalles para llegar a la finca los podés encontrar en el siguiente enlace: http://www.territoriodezaguates.com/visitas/#donde").then(()=>{
		
		sayQR(text, chat, true, 'Visitas 3');
		
	},{ typing: 3000 });
	
	
});

//waze
/*bot.hear([	/^(?=.*\bwaze\b).*$/gim,
			/^(?=.*\bmandar\b)(?=.*\bubicaci(o|ó)n\b).*$/gim,
			/^(?=.*\bdar\b)(?=.*\bubicaci(o|ó)n\b).*$/gim,
			/^(?=.*\bpasar\b)(?=.*\bubicaci(o|ó)n\b).*$/gim
		], (payload, chat) => {
	
	chat.say("Waze: Territorio de Zaguates http://waze.to/lr/hd1u1mn0fm", { typing: true });
	
});*/

//Donaciones
bot.hear([	'Donaciones',
			/^(?!.*\bmedicament(o|os)\b)(?!.*\bproblem(a|as)\b)(?!.*\bpaypal\b)(?!.*\bpay pal\b)(?!.*\bno entend(i|í)\b)(?!.*\bno entiendo\b)(?!.*\bno se\b)(?!.*\berror\b)(?!.*\baliment(o|ó)\b)(?!.*\bmedicin(a|as)\b)(?!.*\bno pas(ó|o)\b)(?=.*\bdonar\b).*$/gim,
			/^(?!.*\bmedicament(o|os)\b)(?!.*\bproblem(a|as)\b)(?!.*\bpaypal\b)(?!.*\bpay pal\b)(?!.*\bno entend(i|í)\b)(?!.*\bno pas(ó|o)\b)(?!.*\bno entiendo\b)(?!.*\bno se\b)(?!.*\berror\b)(?!.*\baliment(o|ó)\b)(?!.*\bmedicin(a|as)\b)(?=.*\bdonativo\b).*$/gim,
			/^(?!.*\bmedicament(o|os)\b)(?!.*\bproblem(a|as)\b)(?!.*\bpaypal\b)(?!.*\bpay pal\b)(?!.*\bno pas(ó|o)\b)(?!.*\bno entend(i|í)\b)(?!.*\bno entiendo\b)(?!.*\bno se\b)(?!.*\berror\b)(?!.*\baliment(o|ó)\b)(?!.*\bmedicin(a|as)\b)(?=.*\bdonaci(o|ó)n\b).*$/gim
		], (payload, chat) => {
	
	
	var text= "Puede realizar una donación por medio de la plataforma Treeseed.org. Esta permite la opción de poder patrocinar un zaguate cada mes y el cobro se genera de forma automática. También permite la opción de poder donar solo una vez. Entra en el siguiente enlace para ir a Treeseed: https://goo.gl/KYm82G";
	
	sayQR(text, chat, true, 'Donaciones');
	
});

//como donar?
bot.hear([	/^(?=.*\bentiendo\b)(?=.*\bdonar\b).*$/gim,
			/^(?=.*\bentiendo\b)(?=.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bentiendo\b)(?=.*\bdona\b).*$/gim,
			/^(?=.*\bentend(i|í)\b)(?=.*\bdona\b).*$/gim,
			/^(?=.*\bentend(i|í)\b)(?=.*\bdonar\b).*$/gim,
			/^(?=.*\bentend(i|í)\b)(?=.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bno se\b)(?=.*\bdona\b).*$/gim,
			/^(?=.*\bno se\b)(?=.*\bdonar\b).*$/gim,
			/^(?=.*\bno se\b)(?=.*\bdonaci(o|ó)n\b).*$/gim,
		], (payload, chat) => {

	
	mixpanelReg('How to donate');
	
	chat.say({
		text: '¿Con qué tipo de donación estás teniendo problemas? ¿Donación simple? ¿Mensual? ¿Otra?',
		quickReplies: [
				{
					"content_type":"text",
					"title":"-Simple",
					"payload":"ES_DON_SIMPLE"
				},
				{
					"content_type":"text",
					"title":"-Mensual",
					"payload":"ES_DON_MENS"
				},
				{
					"content_type":"text",
					"title":"-Otra",
					"payload":"ES_DON_MENS"
				}
		
		]
	});
	
});


//Error donacion
bot.hear([	/^(?=.*\berror\b)(?=.*\bdonaci(ó|o)n\b).*$/gm,
			/^(?=.*\berror\b)(?=.*\bdonar\b).*$/gm,
			/^(?=.*\bproblema\b)(?=.*\bdonaci(ó|o)n\b).*$/gm,
			/^(?=.*\bproblema\b)(?=.*\bdonar\b).*$/gm,
			/^(?=.*\bno pas(ó|o)\b)(?=.*\bdonaci(ó|o)n\b).*$/gim,
			/^(?=.*\bno puedo\b)(?=.*\bdonar\b).*$/gim,
			/^(?=.*\bno puedo\b)(?=.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bno pude\b)(?=.*\bdonar\b).*$/gim,
			/^(?=.*\bno pude\b)(?=.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bno me\b)(?=.*\bdonar\b).*$/gim,
			/^(?=.*\bno me\b)(?=.*\bdonaci(o|ó)n\b).*$/gim,
		], (payload, chat) => {
			
		mixpanel.track('Error donacion', {
			lang: 'es'
		});
	
	chat.say("Por favor entra al siguiente enlace y enviale un mensaje a Treeseed para que te ayuden: https://www.facebook.com/treeseed.org/", { typing: true });
});

//Problemas donación simple
bot.hear([	/^(?=.*\b-Simple\b).*$/gm
		], (payload, chat) => {
	
	mixpanelReg('-Simple');
	
	chat.say("Para donar solo una vez debes seguir estos pasos:\n\n1-Ingresa a Treeseed.org.\n2-Si la página está en inglés, de clic donde dice \"EN\" en el encabezado de la página para cambiar el idioma a español. \n3-Dar clic donde dice \"O Donar Una Vez\".\n4-Llene la información básica para crearse un usuario en Treeseed.org.\n6-Ingresa los datos de tarjeta , el monto con el que desea colaborar y de clic en \"Donar\"", { typing: true });
});

//Problemas donación simple
bot.hear([	/^(?=.*\b-Mensual\b).*$/gm
		], (payload, chat) => {
	
	mixpanelReg('-Mensual');
	
	chat.say("Para patrocinar un zaguate cada mes debes seguir estos pasos:\n\n1-Ingresa a Treeseed.org.\n2-Si la página está en inglés, de clic donde dice \"EN\" en el encabezado de la página para cambiar el idioma a español. \n3-Dar clic en el botón \"Donar Mensualmente\".\n4-Selecciona el plan mensual con el que desea ayudar. El cobro de este se realizará automáticamente.\n5-Da clic en el botón de Siguiente y llene la información básica para crearte un usuario en Treeseed.org.\n6-Ingresa los datos de tarjeta y da clic en \"Donar \"", { typing: true });
});

//Problemas donación simple
bot.hear([	/^(?=.*\b-Otra\b).*$/gm,
			/^(?=.*\bayuda\b).*$/gm,
			/^(?=.*\bcontactarlos\b).*$/gm,
			/^(?=.*\bcomunicarme\b)(?=.*\bustedes\b).*$/gm,
			/^(?=.*\bcomunicarme\b)(?=.*\buds\b).*$/gm,
			'Contacto'
		], (payload, chat) => {
	
	var text = "Escribenos al siguiente correo: info@territoriodezaguates.com";
	
	sayQR(text, chat, true, 'Contacto');
});



//patrocinar zaguate
bot.hear([	/^(?!.*\bmedicament(o|os)\b)(?!.*\balimento\b)(?!.*\bmedicina\b)(?=.*\bpatrocin(ar|arlos)\b).*$/gim,
			/^(?!.*\bmedicament(o|os)\b)(?!.*\balimento\b)(?!.*\bmedicina\b)(?=.*\bpatrocinarlos\b).*$/gim
		], (payload, chat) => {
	
	var text = "Para patrocinar un zaguate cada mes debes seguir estos pasos:\n\n1-Ingresa a Treeseed.org.\n2-Si la página está en inglés, de clic donde dice \"EN\" en el encabezado de la página para cambiar el idioma a español. \n3-Dar clic en el botón \"Donar Mensualmente\".\n4-Selecciona el plan mensual con el que desea ayudar. El cobro de este se realizará automáticamente.\n5-Da clic en el botón de Siguiente y llene la información básica para crearte un usuario en Treeseed.org.\n6-Ingresa los datos de tarjeta y da clic en \"Donar \"";
	
	sayQR(text, chat, true, 'Patrocinar');
	
});

//donación unica
bot.hear([			/^(?!.*\bmedicament(o|os)\b)(?!.*\balimento\b)(?!.*\bmedicina\b)(?=.*\bdonaci(o|ó)n\b)(?=.*\b(ú|u)nica\b).*$/gim,
			/^(?!.*\bmedicament(o|os)\b)(?!.*\balimento\b)(?!.*\bmedicina\b)(?=.*\bdonaci(o|ó)n\b)(?=.*\bsimple\b).*$/gim,
		], (payload, chat) => {
	
	var text = "Para donar solo una vez debes seguir estos pasos:\n\n1-Ingresa a Treeseed.org.\n2-Si la página está en inglés, de clic donde dice \"EN\" en el encabezado de la página para cambiar el idioma a español. \n3-Dar clic donde dice \"O Donar Una Vez\".\n4-Llene la información básica para crearse un usuario en Treeseed.org.\n6-Ingresa los datos de tarjeta , el monto con el que desea colaborar y de clic en \"Donar\"";
	
	sayQR(text, chat, true, 'Donacion unica');
	
});


//Donar alimento
bot.hear([	/^(?=.*\bdona(r|rlo)\b)(?=.*\bcomida\b).*$/gim,
			/^(?=.*\bdona(r|rlo)\b)(?=.*\balimento\b).*$/gim,
			/^(?=.*\bdona(r|rlo)\b)(?=.*\binsumos\b).*$/gim,
			/^(?=.*\bdonaci(o|ó)n\b)(?=.*\bcomida\b).*$/gim,
			/^(?=.*\bdonaci(o|ó)n\b)(?=.*\balimento\b).*$/gim,
			/^(?=.*\bdonaci(o|ó)n\b)(?=.*\binsumos\b).*$/gim,
			/^(?=.*\bdonarl(e|es)\b)(?=.*\bcomida\b).*$/gim,
			/^(?=.*\bdonarl(e|es)\b)(?=.*\balimento\b).*$/gim,
			/^(?=.*\bdonarl(e|es)\b)(?=.*\binsumos\b).*$/gim,
			/^(?=.*\brecolecci(o|ó)n\b)(?=.*\balimento\b).*$/gim,
			/^(?=.*\brecolecci(o|ó)n\b)(?=.*\bcomida\b).*$/gim,
			/^(?=.*\brecolecci(o|ó)n\b)(?=.*\binsumos\b).*$/gim,
		], (payload, chat) => {
	
	var text = "Para obtener más información sobre la ayuda de alimentos, entrá en http://www.territoriodezaguates.com/info/donaciones/otros/#directas";
	
	sayQR(text, chat, true, 'Donar alimento');
	
});

//Donar medicamentos
bot.hear([	/^(?=.*\bdona(r|rlo)\b)(?=.*\bmedicament(o|os)\b).*$/gim,
			/^(?=.*\bdonaci(o|ó)n\b)(?=.*\bmedicament(o|os)\b).*$/gim,
			/^(?=.*\bdona(r|rlo)\b)(?=.*\bmedicinas\b).*$/gim,
			/^(?=.*\bdonaci(o|ó)n\b)(?=.*\bmedicinas\b).*$/gim
		], (payload, chat) => {
		
	var text = "Para obtener más información sobre cómo donar medicamentos, entrá en http://www.territoriodezaguates.com/info/donaciones/otros/#especie";
	
	sayQR(text, chat, true, 'Donar medicamentos');
});


//Cuentas bancarias
bot.hear([	/^(?=.*\bn(ú|u)mero\b)(?=.*\bcuenta\b).*$/gim,
			/^(?=.*\bn(ú|u)mero\b)(?=.*\bbancario\b).*$/gim,
			/^(?=.*\bcuent(a|as)\b)(?=.*\bbancarias\b).*$/gim,
			/^(?=.*\bcuent(a|as)\b)(?=.*\bbanc(o|os)\b).*$/gim,
			/^(?=.*\bcuent(a|as)\b)(?=.*\bbanc(o|os)\b).*$/gim,
			/^(?=.*\bcuenta\b)(?=.*\bnacional\b).*$/gim,
			/^(?=.*\bcuenta\b)(?=.*\bbac\b).*$/gim,
			/^(?=.*\bcuent(a|as)\b)(?=.*\bbanco\b)(?=.*\bnacional\b).*$/gim
		], (payload, chat) => {
	
	mixpanel.track('Cuentas Banco', {
		lang: 'es'
	});
	
	var text = "Para donar por medio de transferencia bancaria ingresá al siguiente enlace: http://www.territoriodezaguates.com/info/donaciones/otros/#cuentas";
	
	sayQR(text, chat, true, 'Cuentas Banco');
});


//Paypal
bot.hear([	/^(?=.*\bpaypal\b).*$/gim,
			/^(?=.*\bpay pal\b).*$/gim,
		], (payload, chat) => {
	
	mixpanel.track('Pay pal', {
		lang: 'es'
	});
	
	var text = "PayPal :http://www.territoriodezaguates.com/info/donaciones/otros/#paypal";
	
	sayQR(text, chat, true, 'Pay pal');
});


//Western union
bot.hear([	/^(?=.*\bwestern union\b).*$/gim,
			/^(?=.*\bwesternunion\b).*$/gim,
		], (payload, chat) => {
	
	var text = "Wester Union: https://www.facebook.com/territoriodezaguates/app/208195102528120/";
	
	sayQR(text, chat, true, 'Wester union');
});


//Voluntariado Quiero ser voluntaria, como hago?
bot.hear([	/^(?=.*\bvoluntariado\b)(?!.*\bayudar\b)(?!.*\bayudarles\b)(?!.*\bcolaborar\b).*$/gim,
			/^(?=.*\bvoluntario\b)(?!.*\bayudar\b)(?!.*\bayudarles\b)(?!.*\bcolaborar\b).*$/gim,
			/^(?=.*\bvoluntaria\b).*$/gim,
		//	/^(?=.*\bquiero\b)(?=.*\bayuda(r|rles)\b).*$/gim,
		//	/^(?=.*\bquisiera\b)(?=.*\bayuda(r|rles)\b).*$/gim,
		//	/^(?=.*\bme gustar(í|i)a\b)(?=.*\bayuda(r|rles)\b).*$/gim,
		//	/^(?=.*\bquiero\b)(?=.*\bcolabora(r|rles)\b).*$/gim,
		//	/^(?=.*\bquisiera\b)(?=.*\bcolabora(r|rles)\b).*$/gim,
		//	/^(?=.*\bme gustar(í|i)a\b)(?=.*\bcolabora(r|rles)\b).*$/gim,
			/^(?=.*\btrabajo comunal\b).*$/gim,
			/^(?=.*\btrabajo social\b).*$/gim,
			/^(?=.*\baccion comunal\b).*$/gim,
			'Voluntariado'
		], (payload, chat) => {
	
	var text = "Gracias por su interes de ayudar a Territorio de Zaguates y ser parte de nuestra tribu. Para ser voluntario debes llenar un formulario y luego nosotros te estaremos contactando a tu correo electrónico.\nPara llenar el formulario debes ingresar en el siguiente enlace: https://goo.gl/gmBXgd";
	
	sayQR(text, chat, true, 'Voluntariado');
});


//Adopciones
bot.hear([	'Adopciones',
			/^(?=.*\badopci(o|ó)n\b).*$/gim,
			/^(?=.*\badoptar\b).*$/gim
		], (payload, chat) => {
	
	var text = "Para obtener más información de como adoptar a alguno de mis amigos, entrá en el siguiente enlace: http://www.territoriodezaguates.com/info/adopciones/";
	
	sayQR(text, chat, true, 'Adopciones');
	
});


//paseos cancelados por clima
bot.hear([	/^(?=.*\blluvia\b)(?=.*\bcaminat(a|as)\b).*$/gim,
			/^(?=.*\bclima\b)(?=.*\bcaminat(a|as)\b).*$/gim,
			/^(?=.*\bcancelar\b)(?=.*\bcaminat(a|as)\b).*$/gim,
			/^(?=.*\bsuspender\b)(?=.*\bcaminat(a|as)\b).*$/gim,
			/^(?=.*\blluvia\b)(?=.*\bpase(o|os)\b).*$/gim,
			/^(?=.*\bclima\b)(?=.*\bpase(o|os)\b).*$/gim,
			/^(?=.*\bcancelar\b)(?=.*\bpase(o|os)\b).*$/gim,
			/^(?=.*\bsuspender\b)(?=.*\bpase(o|os)\b).*$/gim
		], (payload, chat) => {
	
	var text = "En caso de que el paseo sea cancelado, los notificaremos por medio de nuestro facebook";
	
	sayQR(text, chat, true, 'Visitas clima');
});


//venta alimento
bot.hear([	/^(?=.*\bventa\b)(?=.*\balimento\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bcomprar\b)(?=.*\balimento\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bordenar\b)(?=.*\balimento\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bpedir\b)(?=.*\balimento\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bventa\b)(?=.*\bcomida\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bcomprar\b)(?=.*\bcomida\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bordenar\b)(?=.*\bcomida\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			/^(?=.*\bpedir\b)(?=.*\bcomida\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
			'Productos',
			'Alimento'
		//	/^(?=.*\bquiero\b)(?=.*\balimento\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
		//	/^(?=.*\bquiero\b)(?=.*\bcomida\b)(?!.*\bdonativo\b)(?!.*\bdonar\b)(?!.*\bdonaci(o|ó)n\b).*$/gim,
		], (payload, chat) => {
	
		mixpanel.track('Alimento', {
			lang: 'es'
		});
	
		var text="Para obtener más información de la venta de productos, ingresá en el siguiente enlace: http://www.territoriodezaguates.com/info/alimentos/";
	
		sayQR(text, chat, true, 'Alimento');
});


//recibimiento de perros
bot.hear([	'Recibir perro',
		//	/^(?=.*\brecib(ir|en)\b)(?=.*\bperr(o|os)\b).*$/gim,
		//	/^(?=.*\brecib(ir|en)\b)(?=.*\bzaguat(e|es)\b).*$/gim,
			/^(?=.*\bdeja(r|rles)\b)(?=.*\bperr(o|os)\b).*$/gim,
			/^(?=.*\bdeja(r|rles)\b)(?=.*\bzaguat(e|es)\b).*$/gim,
			/^(?=.*\baceptar\b)(?=.*\bperr(o|os)\b).*$/gim,
			/^(?=.*\baceptar\b)(?=.*\bzaguat(e|es)\b).*$/gim,
			/^(?=.*\baceptan\b)(?=.*\bperr(o|os)\b).*$/gim,
			/^(?=.*\baceptan\b)(?=.*\bzaguat(e|es)\b).*$/gim,
			/^(?=.*\bda(r|n)\b)(?=.*\bhogar\b)(?=.*\bperr(o|os)\b).*$/gim,
			/^(?=.*\bda(r|n)\b)(?=.*\bhogar\b)(?=.*\bzaguat(e|es)\b).*$/gim,
			/^(?=.*\bda(r|n)\b)(?=.*\bcasa\b)(?=.*\bperr(o|os)\b).*$/gim,
			/^(?=.*\bda(r|n)\b)(?=.*\bcasa\b)(?=.*\bzaguate\b).*$/gim,
		], (payload, chat) => {
	

	
	chat.say("Nosotros no podemos recibir más perros pero con muchísimo gusto te ayudamos a encontrarle un hogar publicando la información en la página.").then(()=>{
		
		chat.say("Lo que tenes que hacer es escribir un post en tu perfil utilizando el hastag #TerritorioComparte y etiquetarnos, luego nosotros compartimos el post en nuestra página.").then(()=>{
		
			chat.say("El post debe tener la siguiente información:\n1-Foto/s del perro. \n2-Información o historia del perro\n3-Tu teléfono para que los interesados te puedan contactar").then(()=>{
		
				chat.say("No olvides poner el hashtag #TerritorioComparte, etiquetarnos y hacer publico el post. Si no nos etiquetas se nos hace dificil encontrar el posts, sin el hashtag no sabemos si el posts es para compartir y si no es publico no podemos verlo:").then(()=>{
		
					chat.say({
						attachment: 'image',
						url: 'https://firebasestorage.googleapis.com/v0/b/mail-assets.appspot.com/o/tz%2FrecibimientoPerros2.png?alt=media&token=e99f2b07-0c17-4056-9fdf-d6d8a17a4966'
						
					});
					
					setTimeout(function(){ 					
						sayQR('Menú', chat, true, 'Recibir perro');
						
					}, 6000);
					
				},{ typing: 2000 });
			
			
			},{ typing: 1000 });
			
			
		},{ typing: 1000 });
		
		
	},{ typing: true });
	
	
});


//Perritos heridos
bot.hear([	/^(?=.*\bperr(ito|o)\b)(?=.*\bherido\b).*$/gim,
			/^(?=.*\bperr(ito|o)\b)(?=.*\babandona\b).*$/gim,
			/^(?=.*\bperr(ito|o)\b)(?=.*\benfermo\b).*$/gim
		], (payload, chat) => {
	
	var text = "Uno no los puede rescatar a todos pero todos podemos rescatar a uno :) Sé vos mismo el agente de cambio y ayudá a un perrito necesitado, acá en Territorio te ayudamos a compartir el caso para que encontrés la ayuda necesaria o un hogar para el perrito. Enviale a Alvaro por WhatsApp al 8815-2514, fotos bonitas, info completa (ubicación general y teléfono de contacto) y en cuánto nos sea posible te ayudamos a publicar en nuestra página";
	
	sayQR(text, chat, true, 'Perros heridos');
	
});


//perro perdido
bot.hear(['Perro perdido'
		], (payload, chat) => {
	
		chat.say("Lamentamos que se haya perdido el perro, pero con muchísimo gusto te ayudamos a buscarlo publicando la información.").then(()=>{
		
		chat.say("Lo que tenes que hacer es escribir un post en tu perfil utilizando el hastag #TerritorioComparte y etiquetarnos, luego nosotros compartimos el post en nuestra página.").then(()=>{
		
			chat.say("El post debe tener la siguiente información:\n1-Foto/s del perro. \n2-Información necesaria para encontrar/identificar al perro\n3-Tu teléfono para que te puedan contactar").then(()=>{
		
				chat.say("No olvides poner el hashtag #TerritorioComparte, etiquetarnos y hacer publico el post. Si no nos etiquetas se nos hace dificil encontrar el posts, sin el hashtag no sabemos si el posts es para compartir y si no es publico no podemos verlo:").then(()=>{
		
				
				chat.say({
					attachment: 'image',
					url: 'https://firebasestorage.googleapis.com/v0/b/mail-assets.appspot.com/o/tz%2FperroPerdido2.png?alt=media&token=048a0a14-78ec-432c-88d1-dbec8b9fff4b'
					
				});
				
				setTimeout(function(){ 
					sayQR('Menú', chat, true, 'Perro perdido');
				}, 6000);
				
				
				
					
				},{ typing: 300 });
			
			
			},{ typing: 4000 });
			
			
		},{ typing: 3000 });
		
		
	},{ typing: 2000 });
	
});



//Alcancias
bot.hear([	'Alcancias'
		], (payload, chat) => {
	
	mixpanel.track('Alcancias', {
		lang: 'es'
	});
	
	var text = "Para obtener información sobre las alcancías entrá en el siguiente enlace: http://www.territoriodezaguates.com/voluntariado/#alcancias";
	
	
	sayQR(text, chat, true, 'Alcancias');
	
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

bot.start(process.env.PORT);

//bot.start(5000);