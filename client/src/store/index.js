import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as channel } from './channel'
import { initialState as user } from './user'
import { initialState as suggestions } from './suggestions'
import { userReducer } from './user'
import { channelReducer } from './channel'
import { suggestionsReducer, paginationReducer } from './suggestions'

const initialState = {
    token: null,
    ...user,
    ...channel,
    ...suggestions,
    hasOverlay: false,
}

function root(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
        suggestions: suggestionsReducer(state.suggestions,action),
        pagination: paginationReducer(state.pagination, action)
    }
}
let store = createStore(root,applyMiddleware(ReduxThunk))

export default store