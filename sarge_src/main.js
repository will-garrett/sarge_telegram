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

var ngrok = {
    container: process.env.NGROK_CONTAINER || "ngrok_telegram",
    port: process.env.NGROK_PORT || "4040",
    protocol: process.env.NGROK_PROTOCOL || "https"
};
var telegram_interface = require("./lib/telegram");


if(APP_ENV == "local"){
    console.log("Token:",BOT_TOKEN);
    var ngrok_service = require("./lib/ngrok");
    var result = ngrok_service.getNgrokURL().then(async (callback_url)=>{
        await telegram_interface.getTelegramBot(BOT_TOKEN, callback_url).then(async (result)=>{
            console.log("URL:", await callback_url);
            let is_configured = telegram_interface.checkTelegramConfig(result.data, callback_url);
            console.log("Configured:",is_configured);
            if(!is_configured){
                telegram_interface.setCallback(BOT_TOKEN, callback_url);
            }
        })
        .catch((err)=>{
            console.dir(err);
        });
        //
    });
}

router.post("*", (req, res)=>{
    console.dir(req.body);
    res.status(200);
    res.json({ok:true});
});

app.use('/', router);
app.listen(3000);