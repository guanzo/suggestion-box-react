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
		let allowedToEmote = this.allowedToEmote()
		
		let reactionProps = {
			emoteReactions,
			...onSelect,
			allowedToEmote
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
				{ allowedToEmote ? <PopupManager {...popupProps}></PopupManager> : null }
			</React.Fragment>
        )
	}
	allowedToEmote(){
		let { hasEmoted, currentUser } = this.props
		return !(hasEmoted || currentUser.isAnonymousUser)
	}
	onSelectEmote = (emoteId)=>{
		let { postEmote, id: suggestionId, listType,currentUser,hasEmoted } = this.props
		if(!this.allowedToEmote())
			return;

		postEmote(suggestionId, emoteId, listType)
	}
	componentDidCatch(){
		
	}
}

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
