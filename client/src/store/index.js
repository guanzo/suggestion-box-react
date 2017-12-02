import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as user } from './user'
import { userReducer } from './user'
import { channelReducer } from './channel'
import { suggestionsReducer } from './suggestions'
const { REQUIRE_APPROVAL, ALLOW_MOD_ADMIN } = require('@shared/user-util')

const initialState = {
    token: null,
    ...user,
    channel:{
        channelId: -1,
        channelName: 'The broadcaster',
        [REQUIRE_APPROVAL]: false,
        [ALLOW_MOD_ADMIN]: false
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