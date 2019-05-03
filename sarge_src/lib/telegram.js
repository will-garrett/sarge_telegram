var axios = require("axios");
var querystring = require("querystring");

const DOMAIN = "https://api.telegram.org/bot";

function getTelegramBot(token, callback_url){
    let url = DOMAIN+token+"/getWebhookInfo";
    console.log("Checking bot URL..."+url);
    return axios.get(url);
}

function setTelegramWebhook(token, callback_url){
    console.log("Callback URL:",callback_url);
    console.log(querystring.stringify(callback_url));
    let url = DOMAIN+token+"/setWebhook?url="+encodeURIComponent(callback_url);
    console.log("sending...", url);
    axios.get(url).then((result)=>{
        console.log(result.status, result.data);
        //console.dir(result);
    }).catch((error)=>{
        console.log("Error: ", error.status);
        console.dir(error);
        process.exit(1);
    })
};
function checkTelegramConfig(bot_info, callback_url){

    if(bot_info.hasOwnProperty("ok") && bot_info.hasOwnProperty("result")){
        console.log("has ok and has result");
        if(bot_info.ok == true){
            console.log("ok == true");
            console.log(bot_info.result.url, callback_url);
            if(bot_info.result.url == callback_url){
                return true;
            }
        }
    }
    return false;
}
module.exports.checkTelegramConfig = checkTelegramConfig;
module.exports.getTelegramBot = getTelegramBot;
module.exports.setCallback = setTelegramWebhook;