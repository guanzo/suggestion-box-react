
import axios from 'axios'

//testing on localhost window, and not inside twitch iframe
//i need to join a room so that i can cast votes locally
if(!inIframe() && process.env.NODE_ENV === 'development'){
    let token = process.env.TEST_TOKEN
    let role = 'broadcaster'
    //store.dispatch(SET_AUTH, { channelId: -1, userId: -1, token, role, channelName: 'guanzo' })
}

var authed = false;
window.Twitch.ext.onAuthorized(async function(auth) {
    if(authed){
        return;
    }
    authed = true;
    
    //adds token to every request sent thru axios
    var parts = auth.token.split(".");
    var payload = JSON.parse(window.atob(parts[1]));
    var role = payload.role
    console.log(payload)
    console.log(role)
    var channelName = await getChannelName(auth.channelId)
    /* store.commit(SET_GAME, game)
    //send game to server to set vote category 
    //in case this is the first visit to a channel that doesn't exist in the database
    store.dispatch(SET_AUTH, { 
        channelId: auth.channelId, 
        channelName, 
        game,
        token: auth.token, 
        userId: auth.userId, 
        role 
    }) */


});

window.Twitch.ext.onError(function (err) {
    console.error(err);
});

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
console.log(axios)
function getChannelName(channelId){
    console.log(process.env.REACT_APP_EXTENSION_CLIENT_ID)
    return axios.get(`https://api.twitch.tv/helix/users?id=${channelId}`,{
        headers:{
            'Client-Id':process.env.REACT_APP_EXTENSION_CLIENT_ID,
        }
    }).then((response)=>{
        let channelName = response.data.data[0].display_name;
        console.log(channelName)
        return channelName
    })
}