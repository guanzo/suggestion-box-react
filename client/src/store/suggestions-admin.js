import axios from 'axios'
import { fetchCurrentListSuggestions,RESET_PAGINATION } from './suggestions'
export const UPDATE_SUGGESTION_STATUS = 'UPDATE_SUGGESTION_STATUS'
export const CHANGE_CURRENT_LIST_TYPE = 'CHANGE_CURRENT_LIST_TYPE'


export function changeCurrentListType(listType){
	return (dispatch,getState) => {
		dispatch({ type: CHANGE_CURRENT_LIST_TYPE, currentListType: listType })
		return dispatch(fetchCurrentListSuggestions())
    }
}

function updateSuggestionStatusAction(listType, suggestionId, status){
	return {
		type: UPDATE_SUGGESTION_STATUS,
		listType,
		suggestionId,
		status
	}
}

export function updateSuggestionStatus({ id: suggestionId, listType, status }){
    return (dispatch,getState) => {
        let state = getState()
        let channelId = state.channel.channelId;
		let listType = state.suggestions.currentListType
		return axios.put(`/api/channels/${channelId}/suggestions/${suggestionId}`,{
			updateFields: { status }
		})
		.then(res=>{
			dispatch(updateSuggestionStatusAction(listType, suggestionId, status))
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
		case UPDATE_SUGGESTION_STATUS:
			let { listType, suggestionId, status } = action
			let list = suggestions[listType]
			return {
				...suggestions,
				[listType]: {
					...list,
					data: list.data.map(suggestion=>{
						if(suggestion.id !== suggestionId)
							return suggestion
						return { ...suggestion, status }
					})
				}
			}
        default:
			return suggestions
    }
}