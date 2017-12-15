import axios from 'axios'
export const SET_EMOTES = 'SET_EMOTES'

export const initialState = {
    emotes: []
}

export function setEmotes(emotes){
    return {
        type: SET_EMOTES,
        emotes
    }
}
//global twitch emotes
export function fetchEmotes(){
    return (dispatch,getState) => {
		//let { channelId, channelName } = getState().channel
        return axios.get(`https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0`,{
			headers:{
				'Accept': 'application/vnd.twitchtv.v5+json'
			}
        })
        .then(res=>{
			let emotes = res.data.emoticon_sets[0]
			dispatch(setEmotes(emotes))
        })
    }
}
export function emotesReducer(state = [], action){
    switch(action.type) {
        case SET_EMOTES:
            return action.emotes
        default:
            return state
    }
}