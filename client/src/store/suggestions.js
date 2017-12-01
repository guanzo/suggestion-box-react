
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'

export function setSuggestions(suggestions){
    return {
        type: SET_SUGGESTIONS,
        suggestions
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