var axios = require("axios");
var querystring = require("querystring");

const DOMAIN = "https://api.telegram.org/bot";

function getTelegramWebhook(token, callback_url){
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
    if(callback_url){
        if(bot_info.hasOwnProperty("ok") && bot_info.hasOwnProperty("result")){
            if(bot_info.ok == true){
                if(bot_info.result.url == callback_url){
                    return true;
                }
            }
        }
    }
    else{
        console.log("Error no callback_url defined");
        process.exit(1);
    }
    return false;
}
function sendMessage(token, chat_id, message, format = "HTML"){
    axios.get(DOMAIN+token+"/sendMessage?chat_id="+chat_id+"&parse_mode=HTML&text="+encodeURIComponent(message))
    .then((response)=>{console.log(response.data)})
    .catch((err)=>{
        console.log(err);
    });
}
module.exports.checkBotConfig = checkTelegramConfig;
module.exports.getTelegramBot = getTelegramWebhook;
module.exports.setTelegramBot = setTelegramWebhook;
module.exports.sendMessage = sendMessage;