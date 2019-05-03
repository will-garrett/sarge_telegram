var Url = require("url-parse");

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
    if(url.host == "youtu.be" || url.host == "youtube.com"){
        return {type: "youtube-dl", link: url.href};
    }
    else{
        return {type: "unknown", link: url.href};
    }
}
module.exports.parseMessage=parseMessage;