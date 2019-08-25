import axios from 'axios'
import { delay } from '@util'
const { MIN_MINUTES_BETWEEN_POSTS } = require('@shared/user-util')

export const SET_CHANNEL = 'SET_CHANNEL'

export const initialState = {
    channel: {
        channelId: -1,
        channelName: 'The broadcaster',
        title: 'Suggestion Box',
        titleFontSize: 32, //px
        filterProfanity: true,
        requireApproval: false,
		allowModAdmin: true,
		postCooldownMinutes: MIN_MINUTES_BETWEEN_POSTS,
		rules:[
			'Leave a helpful suggestion or constructive criticism.',
			'Check existing posts to see if your idea has already been posted.',
			'Be respectful',
        ],
        theme: {
            color: '#F57C00',
            colorSecondary: '#E65100',
            colorContrast: '#F6F9FC',
        }
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
        return axios.get(`/api/channels/${channelId}`,{
            params:{ channelName },
        })
        .then(res=>{
			dispatch(setChannel(res.data))
			return res.data
        })
    }
}
export function updateChannel(settings){
    return (dispatch,getState) => {
		let { channelId } = getState().channel
		return Promise.all([
            axios.put(`/api/channels/${channelId}`,settings),
            delay()
        ])
        .then(res=>{
			dispatch(setChannel(settings))
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
