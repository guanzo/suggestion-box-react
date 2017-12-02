import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as channel } from './channel'
import { initialState as user } from './user'
import { initialState as suggestions } from './suggestions'
import { userReducer } from './user'
import { channelReducer } from './channel'
import { suggestionsReducer, offsetReducer } from './suggestions'

const initialState = {
    token: null,
    ...user,
    ...channel,
    ...suggestions
}

function root(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
        suggestions: suggestionsReducer(state.suggestions,action),
        offset: offsetReducer(state.offset, action)
    }
}
let store = createStore(root,applyMiddleware(ReduxThunk))

export default store