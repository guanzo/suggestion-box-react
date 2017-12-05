const userUtil = require('@shared/user-util')

export const SET_USER = 'SET_USER'

export const initialState = {
    user:{
        id: null,//never set if anonymous or opaque user
        opaqueId: '',//always starts with 'A' (anonymous) or 'U' (opaque)
        name:'',
        profileImg:'',
        role: null,
    }
}
export function userReducer(state = initialState, { type, user }){
	if(type === SET_USER){
        return {
			...state, 
			...user,
			isAnonymousUser:userUtil.isAnonymousUser(user),
			isOpaqueUser: 	userUtil.isOpaqueUser(user),
			isRealUser: 	userUtil.isRealUser(user),
			isModerator: 	userUtil.isModerator(user),
			isBroadcaster: 	userUtil.isBroadcaster(user),
		}
	}
    else
        return state;
}


export function setUser(user){
    return (dispatch, getState)=>{
		let { allowModAdmin } = getState().channel
		dispatch({
			type: SET_USER,
			user
		})
	}
}

