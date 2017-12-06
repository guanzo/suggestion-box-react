
import axios from 'axios'
import store, { fetchInitialData } from '@/store'
import { setChannel } from '@/store/channel'
import { setUser } from '@/store/user'

//testing on localhost window, and not inside twitch iframe
//i need to join a room so that i can cast votes locally
if(!inIframe() && process.env.NODE_ENV === 'development'){
    // eslint-disable-next-line
    let token = process.env.TEST_TOKEN
    // eslint-disable-next-line
    let role = 'broadcaster'
    //store.dispatch(SET_CHANNEL, { channelId: -1, userId: -1, token, role, channelName: 'guanzo' })
}

let hasFetchedInitialData = false;
//callback will fire when user toggles "grant permissions"
window.Twitch.ext.onAuthorized(async function(auth) {
	
    axios.defaults.headers.common['Authorization'] = auth.token;
    axios.defaults.headers.common['Client-Id'] = auth.clientId;
    axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

    //adds token to every request sent thru axios
    let parts = auth.token.split(".");
    let payload = JSON.parse(window.atob(parts[1]));

    let { user_id, opaque_user_id, role } = payload
    let { channelId } = auth;
    
    //console.log(auth)
    //console.log(payload)
    let userId = null, 
    name = null, 
    profileImg = null;

	//user has granted permission
    if(user_id){
        userId = user_id
        let user = await getTwitchUser(userId)
        name = user.display_name
        profileImg = user.profile_image_url
	}
	
	let user = { id: userId, opaqueId: opaque_user_id, name, profileImg, role }
	store.dispatch(setUser(user))

    if(hasFetchedInitialData)
        return;
	hasFetchedInitialData = true;
	
    let {display_name} = await getTwitchUser(auth.channelId)
	let channelName = display_name
	
    store.dispatch(setChannel({ 
        channelId, 
        channelName
	}))
    fetchInitialData()
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

function getTwitchUser(userId){
    return axios.get(`https://api.twitch.tv/helix/users?id=${userId}`).then((response)=>{
        let user = response.data.data[0];
        return user
    })
}