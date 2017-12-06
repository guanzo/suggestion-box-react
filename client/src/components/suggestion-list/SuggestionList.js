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
		exit={false}
	>
	  {children}
	</CSSTransition>
);

class SuggestionList extends Component {
    render(){
		let { channel, currentUser, suggestions } = this.props
		let { listType } = suggestions
        return (
            <TransitionGroup class="suggestions-list m-b-25">
                {suggestions.data.map((suggestion,i)=>(
					<Fade key={suggestion.id}>
						<Suggestion 
							{...suggestion} 
							channel={channel}  
							listType={listType}
							currentUser={currentUser}
						>
						</Suggestion>
					</Fade>
                ))}
                <LoadMore {...this.props}></LoadMore>
            </TransitionGroup>
        )
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