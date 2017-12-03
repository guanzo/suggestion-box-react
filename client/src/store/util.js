const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY'

export function toggleOverlay(){
	return { type: TOGGLE_OVERLAY }
}

export const initialState = {
	hasOverlay: false
}

export function utilReducer(state = {}, action){
	switch(action.type){
		case TOGGLE_OVERLAY:
			return {
				...state,
				hasOverlay: !state.hasOverlay
			}
		default:
			return state
	}
}