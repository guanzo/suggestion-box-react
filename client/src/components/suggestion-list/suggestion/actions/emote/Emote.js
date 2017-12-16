import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Manager, Target, Popper } from 'react-popper'
import enhanceWithClickOutside from 'react-click-outside'
import { Fade } from '@components/transition/transition'
import { postEmote } from '@store/emotes'
import EmoteExplorer from './EmoteExplorer'
import './Emote.scss'

const popperModifiers = {
	preventOverflow:{
		priority: ['left','right']
	},
	computeStyle:{
		//if true, popper uses css transform, causing blurry text
		gpuAcceleration: false,
	}
}

const PopupManager = ({isOpen, togglePopup, ...props}) => (
	<Manager>
		<Target>
			<span onClick={togglePopup} className="icon open-emotes">
				<i className="fa fa-smile-o"></i>
			</span>
		</Target>
		<Fade in={isOpen}>
			<Popper modifiers={popperModifiers} className="popper">
				<EmoteExplorer {...props}></EmoteExplorer>
			</Popper>
		</Fade>
	</Manager>
  )

class Emote extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			isOpen: false
		}
	}
    render() {
		let { isOpen } = this.state
		let { emotes } = this.props
		
		let popupProps = {
			togglePopup: this.togglePopup,
			closePopup: this.closePopup,
			isOpen,
			emotes,
			getEmoteImg: this.getEmoteImg,
			onSelectEmote: this.onSelectEmote
		}
        return (
            <div className="emotes m-l-10">
				<PopupManager {...popupProps}></PopupManager>
            </div>
        )
	}
	getEmoteImg(id){
		return `https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`
	}
	handleClickOutside() {
		this.setState({ isOpen: false })
	}
	togglePopup = ()=>{
		this.setState({ isOpen: !this.state.isOpen })
	}
	onSelectEmote = (emoteId)=>{
		let { postEmote, id:suggestionId } = this.props
		postEmote(suggestionId, emoteId)
	}
	componentDidCatch(){
		console.log('error')
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
		emotes: state.emotes
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		postEmote: (suggestionId,emoteId)=>dispatch(postEmote(suggestionId,emoteId)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(enhanceWithClickOutside(Emote))
