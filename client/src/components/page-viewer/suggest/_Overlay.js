import React, { Component } from 'react';
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import PreForm from './PreForm'
import Form from './Form'
import PostForm from './PostForm'
import moment from 'moment'
import classNames from 'classnames'
import './_Overlay.scss'
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
				return this.floatingActionButton()
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
			default:
				return this.floatingActionButton()
		}
	}
    render() {
		let { hasOverlay } = this.state
		let className = classNames('overlay flex-center',{ 'is-expanded': hasOverlay }) 
        return (
			<div class={className}> {this.getCurrentComponent()} </div>
        )
    }
	onSubmitDone(status){
		this.setState({ 
			status
		})
		this.transition(Machine.POST_FORM)
	}
    floatingActionButton(){
		let { isAnonymousUser } = this.props.currentUser
		let { isAllowedToSuggest } = this.props
		let nextComponent = (isAnonymousUser || !isAllowedToSuggest)
							?	Machine.PRE_FORM
							:	Machine.FORM
        let style = {
            height: 40,
			width: 40,
        }
        return (
            <button class="button is-primary is-small is-floating"
                style={style}
                onClick={()=>{
					this.transition(nextComponent)
					this.setState({ hasOverlay: true })
				}}
            ><i class="fa fa-comment fa-lg has-text-white"></i></button>
        )
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
		isAllowedToSuggest: isAllowedToSuggestSelector(state)
    }
}
const Overlay_C = connect(mapStateToProps)(Overlay)

export default Overlay_C;
