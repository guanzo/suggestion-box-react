import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { channelReducer } from './channel'
import { suggestionsReducer } from './suggestions'

export const SET_USER = 'SET_USER'

export function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

function userReducer(state = {}, { type, user }){
    if(type === SET_USER)
        return user
    else
        return state;
}

const initialState = {
    token: null,
    user:{
        id: -1,//opaque Ids start with 'U'
        role: null,
        profileImg:'',
        name:''
    },
    channel:{
        channelId: -1,
        channelName: 'The broadcaster',
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