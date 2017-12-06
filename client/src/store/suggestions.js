import axios from 'axios'
import _ from 'lodash'
import { toggleLoading } from './loading'
export const ADD_SUGGESTIONS = 'ADD_SUGGESTIONS'
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const ADD_POSTED_SUGGESTION = 'ADD_POSTED_SUGGESTION'
export const UPDATE_OFFSET = 'UPDATE_OFFSET'
export const UPDATE_SORTBY = 'UPDATE_SORTBY'
export const RESET_PAGINATION = 'RESET_PAGINATION'
export const NO_MORE_PAGES = 'NO_MORE_PAGES'
export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE'
const { 
	LIST_APPROVED, LIST_PENDING, LIST_USER, 
	STATUS_APPROVED, SORT_VOTES, SORT_NEW
} = require('@shared/suggestion-util')


function generateInitialState(){
	var lists = {}
	const listTypes = [LIST_APPROVED,LIST_PENDING,LIST_USER]
	listTypes.forEach(type=>{
		lists = {
			...lists,
			[type]:{
				data: [],
				sortBy: type === LIST_APPROVED ? SORT_VOTES : SORT_NEW,
				offset: 0,
				hasMorePages: true,
				listType: type,
			}
		}
	})
	return {
		suggestions: {
			...lists,
			//app will only ever show one list at a time
			currentListType: LIST_APPROVED
		}
	}
}

export const initialState = generateInitialState()

function updateOffset(listType, offset){
	return {
		type: UPDATE_OFFSET,
		listType,
		offset
	}
}

export function sortSuggestions(sortBy){
	return (dispatch,getState) => {
		let state = getState()
		let listType = state.suggestions.currentListType
		dispatch({ type: UPDATE_SORTBY, listType, sortBy })
		return dispatch(fetchCurrentListSuggestions())
    }
}

export function fetchCurrentListSuggestions(){
	return (dispatch,getState)=>{
		let listType = getState().suggestions.currentListType
		return dispatch(fetchSuggestions(listType))
	}
}

export function fetchCurrentListPaginatedSuggestions(){
	return (dispatch,getState)=>{
		let listType = getState().suggestions.currentListType
		return dispatch(fetchSuggestions(listType, ADD_SUGGESTIONS))
	}
}

/**
 * The only place where suggestions are fetched
 * @param {*} listType - approved, pending, user
 * @param {*} actionType - SET or ADD (paginated)
 */
const PAGE_LIMIT = 5;
export function fetchSuggestions(listType, actionType = SET_SUGGESTIONS){

    return (dispatch,getState) => {
		dispatch(toggleLoading(true))
		
		if(actionType === SET_SUGGESTIONS){
			dispatch({ type: RESET_PAGINATION, listType })
		}
		
		let state = getState()
		let { offset, sortBy } = state.suggestions[listType]
		let { channelId } = state.channel
		return axios.get(`/api/channels/${channelId}/suggestions`,{
			params:{ offset, listType, limit: PAGE_LIMIT, sortBy },
		})
        .then(res=>{
			let { data } = res
			dispatch({
				type: actionType,
				suggestions: data,
				listType
			})
			dispatch(updateOffset(listType, offset += PAGE_LIMIT))
            if(data.length < PAGE_LIMIT)
				dispatch({ type: NO_MORE_PAGES, listType })
			dispatch(toggleLoading(false))
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

export function toggleUpvote({ id: suggestionId, hasUpvoted }){
    return (dispatch,getState) => {
        let state = getState()
		let channelId = state.channel.channelId;
		let listType = state.suggestions.currentListType
		hasUpvoted = !hasUpvoted

		let voteType = hasUpvoted ? 'upvote' : 'downvote'

        return axios.put(`/api/channels/${channelId}/suggestions/${suggestionId}/votes`,{
			voteType
		})
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
	if(!action.listType)
		return suggestions;

	let listType = action.listType
	let list = suggestions[listType]
	return {
		...suggestions,
		[listType]: {
			...list,
			...listPartialReducer(list, action)
		}
	}
}
//returns the updated properties of the list,
//to be merged with the existing list
function listPartialReducer(list = {}, action){
	switch(action.type) {
		case ADD_SUGGESTIONS://paginated suggestions
			return {
				data: [...list.data, ...action.suggestions]
			}
		case SET_SUGGESTIONS://new suggestions
			return {
				data: [...action.suggestions]
			}
		case RESET_PAGINATION:
			return {
				offset: 0,
				hasMorePages: true
			}
		case UPDATE_SORTBY:
			return {
				sortBy: action.sortBy,
			}
        case ADD_POSTED_SUGGESTION://prepend to top, reddit style
			return  {
				data: [action.suggestion, ...list.data]
			}
		case TOGGLE_UPVOTE:
			return {
				data: list.data.map(d=>toggleVote(d,action))
			}
		case UPDATE_OFFSET:
			return {
				offset: action.offset
			}
		case NO_MORE_PAGES:
			return {
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
