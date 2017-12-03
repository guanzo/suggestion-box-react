import axios from 'axios'

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const ADD_APPROVED_SUGGESTION = 'ADD_APPROVED_SUGGESTION'
export const POST_SUGGESTION = 'POST_SUGGESTION'
export const INCREMENT_OFFSET = 'INCREMENT_OFFSET'
export const NO_MORE_PAGES = 'NO_MORE_PAGES'
export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE'
export const SET_USER_SUGGESTIONS = 'SET_USER_SUGGESTIONS'

const { LIST_APPROVED,LIST_PENDING,LIST_USER, STATUS_APPROVED } = require('@shared/suggestion-util')

const PAGE_LIMIT = 5;

function generateInitialState(){
	var state = {}
	const listTypes = [LIST_APPROVED,LIST_PENDING,LIST_USER]
	listTypes.forEach(type=>{
		state = {
			...state,
			[type]:{
				data: [],
				offset: 0,
				hasMorePages: true,
				listType: type,
			}
		}
	})
	return {
		suggestions: state
	}
}

export const initialState = generateInitialState()

export function setSuggestions(suggestions, listType){
    return {
        type: SET_SUGGESTIONS,
		suggestions,
		listType
    }
}

export function fetchSuggestions(listType = LIST_APPROVED){
    return (dispatch,getState) => {
        let state = getState()
        let { offset } = state.suggestions[listType]
        let { channelId } = state.channel
        axios.get(`/api/channels/${channelId}/suggestions`,{
            params:{ offset, listType, limit: PAGE_LIMIT },
        })
        .then(res=>{
            dispatch(setSuggestions(res.data, listType))
            dispatch({ type: INCREMENT_OFFSET, listType })
            if(res.data.length < PAGE_LIMIT)
				dispatch({ type: NO_MORE_PAGES, listType })
        })
    }
}
export function toggleUpvote({ id: suggestionId, hasUpvoted, listType }){
    return (dispatch,getState) => {
        let state = getState()
		let channelId = state.channel.channelId;
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

export function postSuggestion(text, postAnonymously){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
        let user = state.user

        return axios.post(`/api/channels/${channelId}/suggestions`,{
            text,
            postAnonymously,
            user,
        })
        .then(res=>{
            let suggestion = res.data.suggestion
			if(suggestion.status === STATUS_APPROVED){
				[LIST_APPROVED, LIST_USER].forEach(listType=>{
					dispatch({
						type: ADD_APPROVED_SUGGESTION,
						suggestion,
						listType
					})
				})
			}
            return suggestion.status
        })
        .catch(console.log)
    }
}



export function suggestionsReducer(suggestions = {}, action){
	let listType, list;
	if(action.listType){
		listType = action.listType
		list = suggestions[listType]
		return {
			...suggestions,
			[listType]: listTypeReducer(list, action)
		}
	}else
		return suggestions
}
//reduces one of the 3 list types
function listTypeReducer(list = {}, action){
	switch(action.type) {
		case SET_SUGGESTIONS:
			return {
				...list,
				data: [...list.data, ...action.suggestions]
			}
        case ADD_APPROVED_SUGGESTION://prepend to top, reddit style
			return  {
				...list,
				data: [action.suggestion, ...list.data]
			}
		case TOGGLE_UPVOTE:
			return {
				...list,
				data: list.data.map(d=>toggleVote(d,action))
			}
		case INCREMENT_OFFSET:
			return {
				...list,
				offset: list.offset += PAGE_LIMIT
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
