import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { initialState as user, userReducer } from './user'
//import { initialState as util, utilReducer } from './util'
import { 
	initialState as suggestions, fetchSuggestions, suggestionsReducer 
} from './suggestions'
import { 
	initialState as channel, fetchChannel, channelReducer 
} from './channel'

const { LIST_APPROVED,LIST_PENDING,LIST_USER } = require('@shared/suggestion-util')

const initialState = {
    token: null,
    ...user,
    ...channel,
    ...suggestions,
    //...util
}
export function fetchInitialData(){
    store.dispatch(fetchChannel())
	store.dispatch(fetchSuggestions(LIST_APPROVED))
	//need these to check for isAllowedToSuggest
	store.dispatch(fetchSuggestions(LIST_USER))
	
	//for now fetch pending regardless of user type
	//store.dispatch(fetchSuggestions(LIST_PENDING))
}

function root(state = initialState, action){
    return {
		//handles top level properties but now, but it will overwrite new state with old state if its the last reducer......
		//put util properties into its own property later
		//...utilReducer(state, action),
        user: userReducer(state.user, action),
        channel: channelReducer(state.channel, action),
		suggestions: suggestionsReducer(state.suggestions, action),
    }
}

let store = createStore(root,applyMiddleware(ReduxThunk))

export default store