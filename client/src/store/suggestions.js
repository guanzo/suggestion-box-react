import axios from 'axios'

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const ADD_SUGGESTION = 'ADD_SUGGESTION'
export const POST_SUGGESTION = 'POST_SUGGESTION'
export const INCREMENT_OFFSET = 'INCREMENT_OFFSET'
export const NO_MORE_PAGES = 'NO_MORE_PAGES'

const PAGE_LIMIT = 5;

export const initialState = {
    suggestions:[],
    pagination:{
        offset: 0,
        noMorePages: false
    }
}

export function setSuggestions(suggestions){
    return {
        type: SET_SUGGESTIONS,
        suggestions
    }
}

function addSuggestion(suggestion){
    return {
        type: ADD_SUGGESTION,
        suggestion
    }
}

export function fetchSuggestions(){

    return (dispatch,getState) => {
        let state = getState()
        let { offset } = state.pagination
        let { channelId } = state.channel
        axios.get(`/api/channels/${channelId}/suggestions`,{
            params:{ offset, limit: PAGE_LIMIT },
        })
        .then(res=>{
            dispatch(setSuggestions(res.data))
            dispatch({ type: INCREMENT_OFFSET })
            if(res.data.length < PAGE_LIMIT)
                dispatch({ type: NO_MORE_PAGES })
        })
    }
}


export function postSuggestion(text, postAnonymously){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
        let user = state.user

        return axios.post(`/api/channels/${channelId}/suggestions`,{
            text,
            postAnonymously,
            user,
        })
        .then(res=>{
            let suggestion = res.data.suggestion
            if(suggestion.isApproved)
                dispatch(addSuggestion(suggestion))
            return suggestion.isApproved 
        })
        .catch(err=>{
            console.error(err)
        })
    }
}


export function suggestionsReducer(state = [], action){
    switch(action.type) {
        case SET_SUGGESTIONS:
            return [...state, ...action.suggestions]
        case ADD_SUGGESTION://prepend to top, reddit style
            return [action.suggestion, ...state]
        default:
            return state
    }
}

export function paginationReducer(state = {}, { type }){
    switch(type) {
        case INCREMENT_OFFSET:
            return { ...state, offset: state.offset += PAGE_LIMIT }
        case NO_MORE_PAGES:
            return { ...state, noMorePages: true }
        default:
            return state
    }
}