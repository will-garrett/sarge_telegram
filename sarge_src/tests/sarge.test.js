let sarge = require("../lib/sarge.js");
test('should parse youtu.be url', () => {
    let message = {
        "update_id":373668368,
        "message":{
            "message_id":7,
            "from":{"id":220003993,"is_bot":false,"first_name":"Will","last_name":"Garrett","username":"Will0G","language_code":"en"},
            "chat":{"id":220003993,"first_name":"Will","last_name":"Garrett","username":"Will0G","type":"private"},
            "date":1556849793,
            "text":"https://youtu.be/f4fVdf4pNEc",
            "entities":[{"offset":0,"length":28,"type":"url"}]
        }
    };
    expect(sarge.parseMessage(message)).toEqual([{type: "youtube-dl", link: "https://youtu.be/f4fVdf4pNEc"}]);
});
test('should parse youtube.com url', ()=>{
    let message = {
        "update_id": 373668372,
        "message": {
            "message_id": 11,
            "from": {
                "id": 220003993,
                "is_bot": false,
                "first_name": "Will",
                "last_name": "Garrett",
                "username": "Will0G",
                "language_code": "en"
            },
            "chat": {
                "id": 220003993,
                "first_name": "Will",
                "last_name": "Garrett",
                "username": "Will0G",
                "type": "private"
            },
            "date": 1556862537,
            "text": "https://www.youtube.com/watch?v=f4fVdf4pNEc",
            "entities": [
                {
                    "offset": 0,
                    "length": 43,
                    "type": "url"
                }
            ]
        }
    };
    expect(sarge.parseMessage(message)).toEqual([{type: "youtube-dl", link: "https://www.youtube.com/watch?v=f4fVdf4pNEc"}]);
    // https://www.youtube.com/watch?v=f4fVdf4pNEc
});