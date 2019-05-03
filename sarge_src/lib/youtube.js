var os = require("os");
var exec = require("child_process").execSync;

function getYoutube(youtube_url){
    var result = exec("youtube-dl "+youtube_url, {
        cwd: "/down"
    }).toString().split('\r');
    return "<b>Created:</b> <i>"+result[0].split('\n')[2].split(' ')[2]+"</i>";
}
module.exports.getYoutube=getYoutube;