
import { createSelector } from 'reselect'
import { toggleOverlay } from '@/store/util'
import { connect } from 'react-redux'
import Suggest from './Suggest'

const { isAllowedToSuggest } = require('@shared/user-util')

const isAllowedToSuggestSelector = createSelector(
	[ state => state.suggestions.user.data ],
	(userSuggestions)=>{
		if(!userSuggestions.length)
			return true;
		let lastSuggestionDate = userSuggestions[0].createdAt;
		return isAllowedToSuggest(lastSuggestionDate)
	}
)

const mapStateToProps = (state, ownProps) => {
    return {
		currentUser: state.user,
		hasOverlay: state.hasOverlay,
		isAllowedToSuggest: isAllowedToSuggestSelector(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
		toggleOverlay: ()=> dispatch(toggleOverlay()),
    }
}

const Overlay = connect(mapStateToProps,mapDispatchToProps)(Suggest)

export default Overlay;
