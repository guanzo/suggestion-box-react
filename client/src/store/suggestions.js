import axios from 'axios'

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const ADD_SUGGESTION = 'ADD_SUGGESTION'

export const POST_SUGGESTION = 'POST_SUGGESTION'

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

export function postSuggestion(text){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
        let userId = state.user.id
        return axios.post(`/api/channels/${channelId}/suggestions`,{
            text,
            userId
        })
        .then(res=>{
            console.log(res)
            dispatch(addSuggestion())
        })
        .catch(err=>{
            console.error(err)
        })
    }
}

export function suggestionsReducer(state = [], action){
    switch(action.type) {
        case SET_SUGGESTIONS:
            return action.suggestions
        default:
            return state
    }
}