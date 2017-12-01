import axios from 'axios'
import { setSuggestions } from './suggestions'
export const SET_CHANNEL = 'SET_CHANNEL'

export function setChannel(channel){
    return {
        type: SET_CHANNEL,
        channel
    }
}

export function fetchChannel(channelId, channelName){
    let baseUrl = process.env.REACT_APP_SERVER_URL
    return (dispatch,getState) => {
        axios.get(`${baseUrl}api/channels/${channelId}`,{
            params:{ channelName },
        })
        .then(res=>{
            dispatch(setChannel(res.data))
            dispatch(setSuggestions(res.data.suggestions))
            console.log(getState())
        })
    }
}

export function channelReducer(state = {}, action){
    switch(action.type) {
        case SET_CHANNEL:
            return {...state, channel: action.channel}
        default:
            return state
    }
}