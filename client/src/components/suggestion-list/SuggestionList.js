import React, { Component } from 'react';
import { connect } from 'react-redux'
import { isAdminSelector } from '@/store/user'
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './SuggestionList.scss'

const Fade = ({ children, ...props }) => (
	<CSSTransition
		{...props}
		timeout={250}
		classNames="fade"
		onEnter={el=>el.style.transitionDelay = `${props.index*.05}s`}
		addEndListener={el => {
			el.addEventListener('transitionend',()=>el.style.transitionDelay = null, false);
		}}	
		exit={false}
	>
	  {children}
	</CSSTransition>
);

class SuggestionList extends Component {
	constructor(){
		super()
		this.state = {
			hasPaginated: false
		}
	}
	//only show stagger transition for first set of paginated items, 
	//b/c i can't figure out how to give zero index to newly paginated items for transition delay
	//and it's fine b/c there's not enough height to see the new page
    render(){
		let { hasPaginated } = this.state
		let { channel, currentUser, suggestions } = this.props
		let { listType } = suggestions
        return (
            <TransitionGroup class="suggestions-list m-b-25">
                {suggestions.data.map((suggestion,i)=>(
					<Fade index={hasPaginated ? 0 : i}
					key={suggestion.id}
					>
						<Suggestion 
							{...suggestion} 
							channel={channel}  
							listType={listType}
							currentUser={currentUser}
						>
						</Suggestion>
					</Fade>
                ))}
                <LoadMore onClick={this.onPaginate.bind(this)}{...this.props}></LoadMore>
            </TransitionGroup>
        )
	}
	componentWillReceiveProps(nextProps){
		let { listType, sortBy } = this.props.suggestions
		let { listType: nextListType, sortBy: nextSortBy } = nextProps.suggestions
		if(listType !== nextListType || sortBy !== nextSortBy)
			this.setState({ hasPaginated: false })

	}
	onPaginate(){
		this.setState({ hasPaginated: true })
	}
}

const mapStateToProps = (state, ownProps) => {
	let { suggestions, channel, user } = state
	let { currentListType } = suggestions
    return {
		suggestions: suggestions[currentListType],
		channel: channel,
		currentUser: {
			...user,
			isAdmin: isAdminSelector(state)
		},
    }
}
const SuggestionsList_C = connect(mapStateToProps)(SuggestionList)

export default SuggestionsList_C