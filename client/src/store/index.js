import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as user, userReducer } from './user'
import { 
	initialState as suggestions, fetchSuggestions, suggestionsReducer 
} from './suggestions'
import { suggestionsAdminReducer } from './suggestions-admin'
import { 
	initialState as channel, fetchChannel, channelReducer 
} from './channel'
import { toggleLoading, loadingReducer } from './loading'

const { LIST_APPROVED,LIST_USER } = require('@shared/suggestion-util')


const initialState = {
    ...user,
    ...channel,
	...suggestions,
	isLoading: true
}
export async function fetchInitialData(){
	store.dispatch(toggleLoading(true))
	await Promise.all([
		store.dispatch(fetchChannel()),
		store.dispatch(fetchSuggestions(LIST_APPROVED)),
		//need these to check for isAllowedToSuggest
		store.dispatch(fetchSuggestions(LIST_USER))
	])
	store.dispatch(toggleLoading(false))
}


function root(state = initialState, action){

	let suggestions = suggestionsReducer(state.suggestions, action)
	suggestions = suggestionsAdminReducer(suggestions, action)

    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
		suggestions,
		isLoading: loadingReducer(state.isLoading, action),
    }
}

let store = createStore(root,applyMiddleware(ReduxThunk))

export default store