var axios = require("axios");

function retrieveNgrokURL(url = 'http://ngrok_telegram:4040/api/tunnels', protocol = 'https'){
    return axios.get(url).then(async (response)=>{
        if(response.data.hasOwnProperty('tunnels')){
            for(const tunnel of response.data.tunnels){
                if(tunnel.hasOwnProperty('proto')){
                    if(tunnel.proto == protocol){
                        return await tunnel.public_url;
                    }
                }
            }
        }
    });
}
module.exports.getNgrokURL = retrieveNgrokURL;