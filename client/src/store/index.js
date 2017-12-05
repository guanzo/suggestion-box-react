import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as user, userReducer } from './user'
//import { initialState as util, utilReducer } from './util'
import { 
	initialState as suggestions, fetchSuggestions, suggestionsReducer 
} from './suggestions'
import { suggestionsAdminReducer } from './suggestions-admin'
import { 
	initialState as channel, fetchChannel, channelReducer 
} from './channel'

const { LIST_APPROVED,LIST_USER } = require('@shared/suggestion-util')

const initialState = {
    ...user,
    ...channel,
    ...suggestions
}
export function fetchInitialData(){
	store.dispatch(fetchChannel())
	store.dispatch(fetchSuggestions(LIST_APPROVED))
	//need these to check for isAllowedToSuggest
	store.dispatch(fetchSuggestions(LIST_USER))
}

function root(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
		suggestions: {
			...suggestionsReducer(state.suggestions, action),
			...suggestionsAdminReducer(state.suggestions, action),
		}
    }
}

let store = createStore(root,applyMiddleware(ReduxThunk))

export default store