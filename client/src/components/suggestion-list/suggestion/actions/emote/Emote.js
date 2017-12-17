import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { postEmote } from '@store/emotes'
import Reactions from './Reactions'
import PopupManager from './PopupManager'
import './Emote.scss'


class Emote extends PureComponent {
    render() {
		let { emotes, emoteReactions, hasEmoted } = this.props
		let onSelect = { onSelectEmote: this.onSelectEmote }
		let reactionProps = {
			emoteReactions,
			hasEmoted,
			...onSelect
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
				{ !hasEmoted ? <PopupManager {...popupProps}></PopupManager> : null }
			</React.Fragment>
        )
	}
	onSelectEmote = (emoteId)=>{
		let { postEmote, id: suggestionId, listType } = this.props
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
