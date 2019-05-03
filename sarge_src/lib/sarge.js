var axios = require("axios");
var querystring = require("querystring");


function setTelegramWebhook(token, callback_url){
    console.log("Callback URL:",callback_url);
    console.log(querystring.stringify(callback_url));
    let url = "https://api.telegram.org/bot"+token+"/setWebhook?url="+encodeURIComponent(callback_url);
    console.log("sending...", url);
    axios.get(url).then((result)=>{
        console.dir(result.status);
        console.log(result.data);
        //console.dir(result);
    }).catch((error)=>{
        console.log("Error: ", error.status);
        console.dir(error);
        process.exit(1);
    })
};

module.exports.setCallback = setTelegramWebhook;