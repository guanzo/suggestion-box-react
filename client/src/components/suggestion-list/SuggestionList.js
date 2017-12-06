import React, { Component } from 'react';
import { connect } from 'react-redux'
import { isAdminSelector } from '@/store/user'
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'

class SuggestionList extends Component {
    render(){
		let { channel, currentUser, suggestions } = this.props
		let { listType } = suggestions
        return (
            <div class="suggestions-list m-b-25">
                {
                    this.props.suggestions.data.map(suggestion=>{
						return <Suggestion 
									{...suggestion} 
									channel={channel}  
									listType={listType}
									currentUser={currentUser}
									key={suggestion.id}
								>
							   </Suggestion>
                    })
                }
                <LoadMore {...this.props}></LoadMore>
            </div>
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