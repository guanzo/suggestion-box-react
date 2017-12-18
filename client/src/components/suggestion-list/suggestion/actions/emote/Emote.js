import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { postEmote } from '@store/emotes'
import Reactions from './Reactions'
import PopupManager from './PopupManager'
import './Emote.scss'


class Emote extends PureComponent {
    render() {
		let { emotes, emoteReactions } = this.props
		let onSelect = { onSelectEmote: this.onSelectEmote }
		let isAllowedToEmote = this.isAllowedToEmote()

		let reactionProps = {
			emoteReactions,
			...onSelect,
			isAllowedToEmote
		}
		let popupProps = {
			togglePopup: this.togglePopup,
			closePopup: this.closePopup,
			emotes,
			...onSelect
		}
		
        return (
            <React.Fragment>
				<Reactions {...reactionProps}></Reactions>
				{ isAllowedToEmote ? <PopupManager {...popupProps}></PopupManager> : null }
			</React.Fragment>
        )
	}
	isAllowedToEmote(){
		let { hasEmoted, currentUser } = this.props
		return !(hasEmoted || currentUser.isAnonymousUser)
	}//can select emote from reactions list or popup
	onSelectEmote = (emoteId)=>{
		let { postEmote, id: suggestionId, listType } = this.props
		if(!this.isAllowedToEmote())
			return;

		postEmote(suggestionId, emoteId, listType)
	}
	componentDidCatch(){
		
	}
}
export { Emote }

const mapStateToProps = (state, ownProps) => {
    return {
		emotes: state.emotes
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		postEmote: (...args)=>dispatch(postEmote(...args)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Emote)
