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
var telegram_bot = require("./lib/sarge");


if(APP_ENV == "local"){
    console.log("Token:",BOT_TOKEN);
    var ngrok_service = require("./lib/ngrok");
    var result = ngrok_service.getNgrokURL().then((callback_url)=>{
        telegram_bot.setCallback(BOT_TOKEN, callback_url);
    });
}

router.post("*", (req, res)=>{
    console.dir(req);
    res.status(200);
    res.json({ok:true});
});
app.use('/', router);
app.listen(3000);