import React, { Component } from 'react';
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import Fab from './Fab'
import PreForm from './PreForm'
import Form from './Form'
import PostForm from './PostForm'
import moment from 'moment'
import classNames from 'classnames'
import './_Overlay.scss'
import { Transition } from 'react-transition-group'
import {VelocityComponent} from 'velocity-react'
const { STATUS_APPROVED } = require('@shared/suggestion-util')
const { isAllowedToSuggest } = require('@shared/user-util')

//state machine
const Machine = {
	FAB: 0, //floating action button
	PRE_FORM: 1,
	FORM: 2,
	POST_FORM: 3,
}

class Overlay extends Component {
	constructor(props){
		super(props)
        this.state = {
			current: Machine.FAB,
            status: STATUS_APPROVED,
			hasOverlay: false,
		}
	}
	transition(to){
		this.setState({ current: to })
	}
	getCurrentComponent(){
		let { status } = this.state
		const close = {
			onClose: this.onClose.bind(this)
		}
		switch(this.state.current) {
			case Machine.FAB:
				return <Fab onClick={this.onClick.bind(this)} ></Fab>
			case Machine.PRE_FORM:
				return <PreForm {...close} {...this.props}>
						</PreForm>
			case Machine.FORM:
				return <Form {...close}
							{...this.props} 
							onSubmitDone={this.onSubmitDone.bind(this)}
							transition={this.transition.bind(this)}>
						</Form>
			case Machine.POST_FORM:
				return <PostForm {...close} {...this.props} status={status} ></PostForm>
		}
	}
	onClick(){
		let { isAnonymousUser } = this.props.currentUser
		let { isAllowedToSuggest } = this.props
		let nextComponent = (isAnonymousUser || !isAllowedToSuggest)
							?	Machine.PRE_FORM
							:	Machine.FORM
		this.transition(nextComponent)
		this.setState({ hasOverlay: true })
	}
    render() {
		let { hasOverlay } = this.state
		let velocityProps = this.velocityProps()
		
		let className = classNames('overlay flex-center',{ 'is-expanded': hasOverlay }) 
		
		const duration = 300;

		const defaultStyle = {
			transition: `opacity ${duration}ms ease-in-out`,
			opacity: 0,
		}

		const transitionStyles = {
			entering: { opacity: 0 },
			entered:  { opacity: 1 },
		};

        return (
			<VelocityComponent {...velocityProps}>
				<div class={className}>
					<div class="overlay-inner flex-center">
						{this.getCurrentComponent()}
					</div>
				</div>
			</VelocityComponent>
        )
	}
	velocityProps(){
		let { hasOverlay } = this.state
		let velocityProps;
		let ease = [0.4, 0.0, 0.2, 1]
		let style = {
			'border-radius': '50%'
		}
		if(!hasOverlay){
			velocityProps = {
				duration: 250,
				runOnMount: true,
				animation: {
					top:['95%','easeOutSine'],
					left:['86%','easeInSine'],
					backgroundColor: ['#F57C00',ease],
					width: ['40px',ease],
					height: ['40px',ease],
				},
				style
			}
		}else{
			velocityProps = {
				duration: 250,
				animation: {
					top:['50%','easeInSine'],
					left:['50%','easeOutSine'],
					backgroundColor: ['#fff',ease],
					width: ['600px',ease],
					height: ['600px',ease],
				},
				style
			}
		}
		return velocityProps
	}
	onSubmitDone(status){
		this.setState({ 
			status
		})
		this.transition(Machine.POST_FORM)
	}
    onClose(){
		this.setState({ hasOverlay: false })
		this.transition(Machine.FAB)
    }
}

const lastSuggestionDate = createSelector(
	[state => state.suggestions.user.data],
	userSuggestions => {
		if(!userSuggestions.length)
			return moment('1970-01-01')
		else
			return userSuggestions[0].createdAt
	}
)

const isAllowedToSuggestSelector = createSelector(
	[lastSuggestionDate],
	lastSuggestionDate => isAllowedToSuggest(lastSuggestionDate)
)

const mapStateToProps = (state, ownProps) => {
    return {
		currentUser: state.user,
		lastSuggestionDate: lastSuggestionDate(state),
		isAllowedToSuggest: isAllowedToSuggestSelector(state),
		channel: state.channel
    }
}
const Overlay_C = connect(mapStateToProps)(Overlay)

export default Overlay_C;
