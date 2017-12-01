import ReduxThunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { channelReducer } from './channel'
import { suggestionsReducer } from './suggestions'
const initialState = {
    channel:{
        userId: -1,
        channelId: -1,
        channelName: 'The broadcaster',
        isAuthed: false,
        token: null,
    },
    suggestions:['ahahaha']
}


function root(state = initialState, action){
    return {
        channel: channelReducer(state.channel, action),
        suggestions: suggestionsReducer(state.suggestions,action)
    }
}
let store = createStore(root,applyMiddleware(ReduxThunk))

export default store