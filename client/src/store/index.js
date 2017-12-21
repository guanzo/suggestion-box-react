import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { initialState as user, userReducer } from './user'
import { 
	initialState as suggestions, fetchSuggestions, suggestionsReducer 
} from './suggestions'
import { suggestionsAdminReducer } from './suggestions-admin'
import { 
	initialState as channel, fetchChannel, channelReducer 
} from './channel'
import { 
	initialState as emotes, fetchEmotes, emotesReducer 
} from './emotes'
import { toggleLoading, loadingReducer } from './loading'

const { LIST_APPROVED,LIST_USER } = require('@shared/suggestion-util')


const initialState = {
    ...user,
    ...channel,
	...suggestions,
	...emotes,
	isLoading: true
}
export async function fetchInitialData(){
	store.dispatch(toggleLoading(true))
	store.dispatch(fetchChannel())//this is much faster than the other 2 calls, no need to wait
	store.dispatch(fetchEmotes())
	await Promise.all([
		store.dispatch(fetchSuggestions(LIST_APPROVED)),
		//need these to check for isAllowedToSuggest
		store.dispatch(fetchSuggestions(LIST_USER))
	])
	store.dispatch(toggleLoading(false))
}

function reduceReducers(...reducers) {
    return (initialState, action) => reducers.reduce( (state, reducer) => reducer(state, action), initialState );
}

function root(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
		suggestions: reduceReducers(suggestionsReducer,suggestionsAdminReducer)(state.suggestions, action),
		emotes: emotesReducer(state.emotes, action),
		isLoading: loadingReducer(state.isLoading, action),
    }
}

const store = createStore(root,applyMiddleware(ReduxThunk))

export default store