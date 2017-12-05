import axios from 'axios'
import { UPDATE_SORTBY, fetchSuggestions } from './suggestions'
export const DELETE_SUGGESTION = 'DELETE_SUGGESTION'
export const CHANGE_CURRENT_LIST_TYPE = 'CHANGE_CURRENT_LIST_TYPE'

const { STATUS_DELETED } = require('@shared/suggestion-util')

export function changeCurrentListType(listType){
	return (dispatch,getState) => {
		dispatch({ type: CHANGE_CURRENT_LIST_TYPE, currentListType: listType })
		dispatch({ type: UPDATE_SORTBY, listType })
		return dispatch(fetchSuggestions())
    }
}
export function approveSuggestion({ id: suggestionId, listType }){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
		let listType = state.suggestions.currentListType
		return axios.delete(`/api/channels/${channelId}/suggestions/${suggestionId}`)
		.then(res=>{
			dispatch({
				type: DELETE_SUGGESTION,
				suggestionId,
				listType
			})
		})
        .catch(console.log)
    }
}

export function deleteSuggestion({ id: suggestionId, listType }){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
		let listType = state.suggestions.currentListType
		return axios.put(`/api/channels/${channelId}/suggestions/${suggestionId}/status`)
		.then(res=>{
			dispatch({
				type: DELETE_SUGGESTION,
				suggestionId,
				listType
			})
		})
        .catch(console.log)
    }
}

export function suggestionsAdminReducer(suggestions = {}, action){
	switch(action.type) {
		case CHANGE_CURRENT_LIST_TYPE:
			return {
				...suggestions,
				currentListType: action.currentListType
			}
		case DELETE_SUGGESTION:
			let listType = action.listType
			let list = suggestions[listType]
			return {
				...suggestions,
				[listType]: {
					...list,
					data: list.data.map(suggestion=>{
						if(suggestion.id !== action.suggestionId)
							return suggestion
						return { ...suggestion, status: STATUS_DELETED }
					})
				}
			}
        default:
            return list
    }
}