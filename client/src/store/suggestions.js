import axios from 'axios'
import _ from 'lodash'
export const ADD_SUGGESTIONS = 'ADD_SUGGESTIONS'
export const ADD_POSTED_SUGGESTION = 'ADD_POSTED_SUGGESTION'
export const POST_SUGGESTION = 'POST_SUGGESTION'
export const DELETE_SUGGESTION = 'DELETE_SUGGESTION'
export const UPDATE_OFFSET = 'UPDATE_OFFSET'
export const NO_MORE_PAGES = 'NO_MORE_PAGES'
export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE'
export const SET_USER_SUGGESTIONS = 'SET_USER_SUGGESTIONS'
export const UPDATE_SORTBY = 'UPDATE_SORTBY'
export const CHANGE_CURRENT_LIST_TYPE = 'CHANGE_CURRENT_LIST_TYPE'

const { 
	LIST_APPROVED, LIST_PENDING, LIST_USER, 
	STATUS_APPROVED, STATUS_DELETED, 
	SORT_VOTES, SORT_NEW
} = require('@shared/suggestion-util')

const PAGE_LIMIT = 5;

function generateInitialState(){
	var lists = {}
	const listTypes = [LIST_APPROVED,LIST_PENDING,LIST_USER]
	listTypes.forEach(type=>{
		lists = {
			...lists,
			[type]:{
				data: [],
				sortBy: SORT_VOTES,
				offset: 0,
				hasMorePages: true,
				listType: type,
			}
		}
	})
	return {
		suggestions: {
			...lists,
			//app will only ever show one list at a time. no tabs.
			currentListType: LIST_APPROVED
		}
	}
}

export const initialState = generateInitialState()

export function addSuggestions(suggestions, listType){
    return {
        type: ADD_SUGGESTIONS,
		suggestions,
		listType
    }
}

function updateOffset(listType, offset){
	return {
		type: UPDATE_OFFSET,
		listType,
		offset
	}
}

export function changeCurrentListType(listType){
	return (dispatch,getState) => {
		dispatch({ type: CHANGE_CURRENT_LIST_TYPE, currentListType: listType })
		dispatch({ type: UPDATE_SORTBY, listType })
		return dispatch(fetchSuggestions())
    }
}

export function sortSuggestions(sortBy){
	return (dispatch,getState) => {
		let state = getState()
		let listType = state.suggestions.currentListType
		dispatch({ type: UPDATE_SORTBY, listType, sortBy })
		return dispatch(fetchSuggestions())
    }
}
export function fetchSuggestions(listType){

    return (dispatch,getState) => {
		let state = getState()
		
		if( _.isUndefined(listType) ){
			listType = state.suggestions.currentListType
		}

        let { offset, sortBy } = state.suggestions[listType]
        let { channelId } = state.channel
        axios.get(`/api/channels/${channelId}/suggestions`,{
            params:{ offset, listType, limit: PAGE_LIMIT, sortBy },
        })
        .then(res=>{
            dispatch(addSuggestions(res.data, listType))
			dispatch(updateOffset(listType, offset += PAGE_LIMIT))
            if(res.data.length < PAGE_LIMIT)
				dispatch({ type: NO_MORE_PAGES, listType })
        })
    }
}
//post either comes back with status approved or pending
export function postSuggestion(text, postAnonymously){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
        let user = _.pick(state.user,['id','opaqueId','name','profileImg','role'])

        return axios.post(`/api/channels/${channelId}/suggestions`,{
            text,
            postAnonymously,
            user,
        })
        .then(res=>{
			let suggestion = res.data.suggestion
			let lists = [LIST_USER]
			if(suggestion.status === STATUS_APPROVED){
				lists.push(LIST_APPROVED)
			}
			lists.forEach(listType=>{
				dispatch({
					type: ADD_POSTED_SUGGESTION,
					suggestion,
					listType
				})
			})
			
            return suggestion.status
        })
        .catch(console.log)
    }
}


export function deleteSuggestion({ id: suggestionId, listType }){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
		let listType = state.suggestions.currentListType

		//delete component handles client update.
		return axios.delete(`/api/channels/${channelId}/suggestions/${suggestionId}`)
		.then(res=>{
			
			dispatch({
				type: DELETE_SUGGESTION,
				suggestionId,
				listType
			})
			return res;//delete component is waiting for response
		})
        .catch(console.log)
    }
}

export function toggleUpvote({ id: suggestionId, hasUpvoted }){
    return (dispatch,getState) => {
        let state = getState()
		let channelId = state.channel.channelId;
		let listType = state.suggestions.currentListType
		hasUpvoted = !hasUpvoted

		let voteType = hasUpvoted ? 'upvote' : 'downvote'

        return axios.put(`/api/channels/${channelId}/suggestions/${suggestionId}/${voteType}`)
        .then(res=>{
			dispatch({ 
				type: TOGGLE_UPVOTE,
				suggestionId,
				hasUpvoted,
				listType
			 })
        })
        .catch(console.log)
    }
}

//any suggestion action must contain a 'listType' property
export function suggestionsReducer(suggestions = {}, action){
	let listType, list;
	if(action.listType){
		listType = action.listType
		list = suggestions[listType]
		return {
			...suggestions,
			[listType]: listTypeReducer(list, action)
		}
	}
	switch(action.type){
		case CHANGE_CURRENT_LIST_TYPE:
			return {
				...suggestions,
				currentListType: action.currentListType
			}
		default:
			return suggestions
	}
}
//reduces one of the 3 list types
function listTypeReducer(list = {}, action){
	switch(action.type) {
		case ADD_SUGGESTIONS://paginated suggestions
			return {
				...list,
				data: [...list.data, ...action.suggestions]
			}
		case UPDATE_SORTBY:
			return {
				...list,
				data: [],
				offset: 0,
				sortBy: action.sortBy,
				hasMorePages: true
			}
        case ADD_POSTED_SUGGESTION://prepend to top, reddit style
			return  {
				...list,
				data: [action.suggestion, ...list.data]
			}
		case DELETE_SUGGESTION:
			return {
				...list,
				data: list.data.map(suggestion=>{
					if(suggestion.id !== action.suggestionId)
						return suggestion
					return { ...suggestion, status: STATUS_DELETED }
				})
			}
		case TOGGLE_UPVOTE:
			return {
				...list,
				data: list.data.map(d=>toggleVote(d,action))
			}
		case UPDATE_OFFSET:
			return {
				...list,
				offset: action.offset
			}
		case NO_MORE_PAGES:
			return {
				...list,
				hasMorePages: false
			}
        default:
            return list
    }
}


function toggleVote(suggestion = {}, {type, suggestionId, hasUpvoted}){
	if(suggestion.id !== suggestionId)
		return suggestion
		
	let { votesLength } = suggestion
	return {
		...suggestion,
		votesLength: hasUpvoted ? ++votesLength : --votesLength,
		hasUpvoted: hasUpvoted
	}
}
