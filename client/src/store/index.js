import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as channel, fetchChannel } from './channel'
import { initialState as user } from './user'
import { initialState as suggestions, fetchSuggestions } from './suggestions'
import { userReducer } from './user'
import { channelReducer } from './channel'
import { suggestionsReducer } from './suggestions'

const { LIST_APPROVED,LIST_PENDING,LIST_USER } = require('@shared/suggestion-util')

const initialState = {
    token: null,
    ...user,
    ...channel,
    ...suggestions,
    hasOverlay: false,
}
export function fetchInitialData(){
    store.dispatch(fetchChannel())
	store.dispatch(fetchSuggestions(LIST_APPROVED))
	store.dispatch(fetchSuggestions(LIST_USER))
	//for now fetch pending regardless of user type
	store.dispatch(fetchSuggestions(LIST_PENDING))
}
function root(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
		suggestions: suggestionsReducer(state.suggestions, action)
    }
}
let store = createStore(root,applyMiddleware(ReduxThunk))

export default store