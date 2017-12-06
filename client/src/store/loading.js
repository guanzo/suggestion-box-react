
export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export function toggleLoading(isLoading){
	return {
		type: TOGGLE_LOADING,
		isLoading
	}
}
export function loadingReducer(state = false, action){
	if(action.type === TOGGLE_LOADING){
		return action.isLoading
	}else
		return state
}