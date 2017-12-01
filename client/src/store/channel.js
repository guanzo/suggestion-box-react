import axios from 'axios'
import _ from 'lodash'
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
            let data = _.omit(res.data,'suggestions')
            let { suggestions } = res.data
            
            dispatch(setChannel(data))
            dispatch(setSuggestions(suggestions))
        })
    }
}

export function channelReducer(state = {}, action){
    switch(action.type) {
        case SET_CHANNEL:
            return {...state, ...action.channel}
        default:
            return state
    }
}