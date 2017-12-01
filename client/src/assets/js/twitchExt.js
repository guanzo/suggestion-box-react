
import axios from 'axios'
import store from '@/store'
import { setChannel, fetchChannel } from '@/store/channel'
import { setUser } from '@/store'
//testing on localhost window, and not inside twitch iframe
//i need to join a room so that i can cast votes locally
if(!inIframe() && process.env.NODE_ENV === 'development'){
    // eslint-disable-next-line
    let token = process.env.TEST_TOKEN
    // eslint-disable-next-line
    let role = 'broadcaster'
    //store.dispatch(SET_CHANNEL, { channelId: -1, userId: -1, token, role, channelName: 'guanzo' })
}
//var authed = false;
window.Twitch.ext.onAuthorized(async function(auth) {
    /* if(authed){
        return;
    }
    authed = true; */

    axios.defaults.headers.common['Authorization'] = auth.token;
    axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

    //adds token to every request sent thru axios
    var parts = auth.token.split(".");
    var payload = JSON.parse(window.atob(parts[1]));

    var { user_id, role } = payload
    let { channelId, userId: opaqueUserId } = auth;
    
    let userId
    if (user_id) {
        userId = user_id
        // user has granted
        console.log('user has granted')
    } else {
        userId = opaqueUserId
        console.log('user has NOT granted')
        // user has NOT granted
    }
    let user = { id: userId, role }
    store.dispatch(setUser(user))

    var streamer = await getUser(auth.channelId)
    let channelName = streamer.display_name
    console.log(streamer)
    store.dispatch(setChannel({ 
        channelId, 
        channelName
    }))
    
    store.dispatch(fetchChannel(channelId, channelName))
    /* 
     */
    //axios.get('')
    /* store.commit(SET_GAME, game)
    //send game to server to set vote category 
    //in case this is the first visit to a channel that doesn't exist in the database
    store.dispatch(SET_CHANNEL, { 
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

function getUser(userId){
    return axios.get(`https://api.twitch.tv/helix/users?id=${userId}`,{
        headers:{
            'Client-Id':process.env.REACT_APP_EXTENSION_CLIENT_ID,
        }
    }).then((response)=>{
        let user = response.data.data[0];
        return user
    })
}