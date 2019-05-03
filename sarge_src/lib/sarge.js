var Url = require("url-parse");
var youtube = require("./youtube");

function parseMessage(update){
    let is_valid = validateMessage(update);
    var result = [];
    if(is_valid){
        msg = update.message;
        if(msg.hasOwnProperty("entities")){
            let urls = [];
            let commands = [];
            for (const entity of msg.entities) {
                if(entity.type == "url"){
                    urls.push(msg.text.substr(entity.offset, entity.length));
                }             
            }
            for(url of urls){
                result.push(parseURLEntity(url));
            }
        }
        else{
            // TODO send message "not sure what you want me to do, maggot!"
        }
    }
    return result;
}
function validateMessage(msg){
    let flag = false;
    if(msg.hasOwnProperty("message")){
        if(msg.message.hasOwnProperty("chat") && 
            msg.message.hasOwnProperty("from") && 
            msg.message.hasOwnProperty("text") &&
            msg.message.hasOwnProperty("date")){
                flag = true;
            }
    }
    return flag;
}
function parseURLEntity(url_string){
    let url = new Url(url_string);
    console.log(url.host);
    if(url.host == "youtu.be" || 
    url.host == "youtube.com" || 
    url.host == "www.youtu.be" ||
    url.host == "www.youtube.com"){
        return {type: "youtube-dl", link: url.href};
    }
    else{
        return {type: "unknown", link: url.href};
    }
}
function processCommands(commands){
    var results = [];
    for (const command of commands) {
        switch(command.type){
            case "youtube-dl":
                results.push(youtube.getYoutube(command.link));
                break;
            default:
                console.log("Unknown command...");
                break;
        }
    }
    return results;
}

module.exports.parseMessage=parseMessage;
module.exports.processCommands=processCommands;