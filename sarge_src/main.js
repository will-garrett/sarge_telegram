var express = require("express");
//var axios = require("axios");
var bodyParser = require("body-parser");

require("dotenv").config();
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

const APP_ENV = process.env.APP_ENV || "local";
const BOT_TOKEN = process.env.TELEGRAM_TOKEN;

var telegram_interface = require("./lib/telegram");
var sarge = require("./lib/sarge");

if(APP_ENV == "local"){
    var ngrok = {
        container: process.env.NGROK_CONTAINER || "ngrok_telegram",
        port: process.env.NGROK_PORT || "4040",
        protocol: process.env.NGROK_PROTOCOL || "https"
    };    
    var ngrok_service = require("./lib/ngrok");
    var result = ngrok_service.getNgrokURL().then((callback_url)=>{
        telegram_interface.getTelegramBot(BOT_TOKEN, callback_url).then((result)=>{
            let is_configured = telegram_interface.checkBotConfig(result.data, callback_url);
            console.log("Ngrok is_configured : ",is_configured);
            if(!is_configured){
                console.log("Setting webhook for callback...");
                telegram_interface.setTelegramBot(BOT_TOKEN, callback_url);
            }
        })
        .catch((err)=>{
            console.dir(err);
        });
    });
}
else if(APP_ENV == "production"){
    // TODO set production host discovery

}
else{

}

router.post("*", (req, res)=>{
    var commands = sarge.parseMessage(req.body);
    var chat_id = req.body.message.chat.id;
    console.log("Executing:");
    console.dir(commands);
    var results = sarge.processCommands(commands);
    for (const result of results) {
        telegram_interface.sendMessage(BOT_TOKEN, chat_id, result);
    }
    res.status(200);
    res.json({ok:true});
});

app.use('/', router);
app.listen(3000);