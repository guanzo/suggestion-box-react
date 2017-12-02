import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as user } from './user'
import { userReducer } from './user'
import { channelReducer } from './channel'
import { suggestionsReducer } from './suggestions'

const initialState = {
    token: null,
    ...user,
    channel:{
        channelId: -1,
        channelName: 'The broadcaster',
        requireApproval: false,
        allowModAdmin: false
    },
    suggestions:[]
}


function root(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
        suggestions: suggestionsReducer(state.suggestions,action)
    }
}
let store = createStore(root,applyMiddleware(ReduxThunk))

export default store