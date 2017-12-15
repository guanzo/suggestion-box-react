import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Manager, Target, Popper } from 'react-popper'
import enhanceWithClickOutside from 'react-click-outside'
import EmoteExplorer from './EmoteExplorer'
import './Emote.scss'

const PopupManager = ({isOpen, togglePopup, ...props}) => (
	<Manager>
		<Target>
			<span onClick={togglePopup} className="icon open-emotes">
				<i className="fa fa-smile-o"></i>
			</span>
		</Target>
		{isOpen && (
			<Popper className="popper">
				<EmoteExplorer {...props}></EmoteExplorer>
			</Popper>
		)}
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
			isOpen,
			emotes,
			getEmoteImg: this.getEmoteImg
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
}

const mapStateToProps = (state, ownProps) => {
    return {
		emotes: state.emotes
    }
}
export default connect(mapStateToProps)(enhanceWithClickOutside(Emote))
