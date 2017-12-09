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
import {VelocityComponent} from 'velocity-react'
const { STATUS_APPROVED, LIST_PENDING } = require('@shared/suggestion-util')
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
	transition = (to)=>{
		this.setState({ current: to })
	}
	getCurrentComponent(){
		let { status } = this.state
		const close = {
			onClose: this.onClose
		}
		switch(this.state.current) {
			case Machine.FAB:
				return <Fab onClick={this.onFabClick}></Fab>
			case Machine.PRE_FORM:
				return <PreForm {...close} {...this.props}></PreForm>
			case Machine.FORM:
				return <Form {...close}
							{...this.props} 
							onSubmitDone={this.onSubmitDone}
							transition={this.transition}>
						</Form>
			case Machine.POST_FORM:
				return <PostForm {...close} {...this.props} status={status}></PostForm>
			default:
				return <Fab onClick={this.onFabClick}></Fab>
		}
	}
	onFabClick = ()=>{
		let { currentUser, lastSuggestionDate } = this.props
		let { isAnonymousUser } = currentUser
		
		let nextComponent = (isAnonymousUser || !isAllowedToSuggest(lastSuggestionDate))
							?	Machine.PRE_FORM
							:	Machine.FORM
		this.transition(nextComponent)
		this.setState({ hasOverlay: true })
	}
    render() {
		let { hasOverlay } = this.state
		let velocityProps = this.velocityProps()
		let className = classNames('overlay flex-center',{ 'is-expanded': hasOverlay }) 

        return (
			<VelocityComponent {...velocityProps}>
				<div className={className}>
					<div className="overlay-inner flex-center">
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
		let style = { 'border-radius': '50%' }
		let defaultPosition = this.getDefaultOverlayPosition()
		if(!hasOverlay){
			velocityProps = {
				duration: 250,
				runOnMount: true,
				animation: {
					...defaultPosition,
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
	getDefaultOverlayPosition(){
		let { hasSuggestions, isLoading, listType } = this.props
		const bottomRight = {
			top:['94.5%','easeOutSine'],
			left:['86.5%','easeInSine'],
		}
		const middle = {
			top:['70%','easeInSine'],
			left:['50%','easeOutSine'],
		}
		if( (hasSuggestions || isLoading) || listType === LIST_PENDING )
			return bottomRight
		else
			return middle
		
	}
	onSubmitDone = (status)=>{
		this.setState({ 
			status
		})
		this.transition(Machine.POST_FORM)
	}
    onClose = ()=>{
		this.setState({ hasOverlay: false })
		this.transition(Machine.FAB)
	}//stupid firefox...
	componentDidCatch(error,info){
		//console.log(error)
		//console.log(info)
	}
}

const getLastSuggestionDate = createSelector(
	[state => state.suggestions.user.data],
	userSuggestions => {
		if(!userSuggestions.length)
			return moment('1970-01-01').toDate()
		else
			return userSuggestions[0].createdAt
	}
)

const mapStateToProps = (state, ownProps) => {
	let { currentListType } = state.suggestions
    return {
		currentUser: state.user,
		lastSuggestionDate: getLastSuggestionDate(state),
		channel: state.channel,
		listType: currentListType,
		hasSuggestions: state.suggestions[currentListType].data.length > 0,
		isLoading: state.isLoading
    }
}
export default connect(mapStateToProps)(Overlay)

