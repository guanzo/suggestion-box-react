import { createSelector } from 'reselect'
const userUtil = require('@shared/user-util')

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
    if(type === SET_USER)
        return {...state, ...user}
    else
        return state;
}

export const SET_USER = 'SET_USER'

export function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

const getUser = state => state.user

export const isAnonymousUser = createSelector(
    [getUser], userUtil.isAnonymousUser
)
export const isOpaqueUser = createSelector(
    [getUser], userUtil.isOpaqueUser
)
export const isRealUser = createSelector(
    [getUser], userUtil.isRealUser
)
export const isModerator = createSelector(
    [getUser], userUtil.isModerator
)
export const isBroadcaster = createSelector(
    [getUser], userUtil.isBroadcaster
)

/*
Usage:

import { userTypes } from '@/store/user' 

const mapStateToProps = (state) => {
  return userTypes(state)
}
*/
export const userTypes = (state)=>{
    return {
        userTypes:{
			isAnonymousUser: isAnonymousUser(state),
			isOpaqueUser: isOpaqueUser(state),
			isRealUser: isRealUser(state),
			isModerator: isModerator(state),
			isBroadcaster: isBroadcaster(state),
		}
    }
}
