import React, { Component } from 'react';
import { connect } from 'react-redux'
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import './SuggestionList.scss';

class SuggestionList extends Component {
    render(){
		let { channel, currentUser, suggestions } = this.props
		let { listType } = suggestions
        return (
            <div class="suggestions-list m-b-25">
                {
                    this.props.suggestions.data.map(suggestion=>{
                        return <Suggestion {...suggestion} 
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
	let { currentListType } = state.suggestions
    return {
		suggestions: state.suggestions[currentListType],
		currentUser: state.user,
		channel: state.channel
    }
}
const SuggestionsList_C = connect(mapStateToProps)(SuggestionList)

export default SuggestionsList_C