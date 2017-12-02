import axios from 'axios'
export const SET_CHANNEL = 'SET_CHANNEL'

export const initialState = {
    channel:{
        channelId: -1,
        channelName: 'The broadcaster',
        requireApproval: false,
        allowModAdmin: false
    },
}

export function setChannel(channel){
    return {
        type: SET_CHANNEL,
        channel
    }
}

export function fetchChannel(){
    return (dispatch,getState) => {
        let { channelId, channelName } = getState().channel
        axios.get(`/api/channels/${channelId}`,{
            params:{ channelName },
        })
        .then(res=>{
            dispatch(setChannel(res.data))
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