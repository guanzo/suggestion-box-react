import React, { PureComponent } from 'react';
import { Fade } from '@components/transition/transition'
import { Manager, Target, Popper } from 'react-popper'
import EmoteExplorer from './EmoteExplorer'
import enhanceWithClickOutside from 'react-click-outside'

const popperModifiers = {
	preventOverflow:{
		priority: ['left','right']
	},
	computeStyle:{
		//if true, popper uses css transform, causing blurry text
		gpuAcceleration: false,
	}
}

class PopupManager extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			isOpen: false
		}
	}
	render(){
		let { isOpen } = this.state
		return (
		<Manager className="open-emotes">
			<Target>
				<span onClick={this.togglePopup} className="icon">
					<i className="fa fa-smile-o"></i>
				</span>
			</Target>
			<Fade in={isOpen}>
				<Popper modifiers={popperModifiers} className="popper">
					<EmoteExplorer {...this.props}></EmoteExplorer>
				</Popper>
			</Fade>
		</Manager>
		)
	}
	handleClickOutside() {
		this.setState({ isOpen: false })
	}
	togglePopup = ()=>{
		this.setState({ isOpen: !this.state.isOpen })
	}
}

export default enhanceWithClickOutside(PopupManager)