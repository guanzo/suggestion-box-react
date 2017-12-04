import React, { Component } from 'react';
import { connect } from 'react-redux'
import SuggestionList from '@/components/suggestion-list/SuggestionList'

const { LIST_APPROVED } = require('@shared/suggestion-util')


const mapStateToProps = (state, ownProps) => {
    return {
		suggestions: state.suggestions[LIST_APPROVED],
		currentUser: state.user,
		channel: state.channel
    }
}
const SuggestionsListApproved = connect(mapStateToProps)(SuggestionList)

class Body extends Component {
    render() {
		const style = {
			position: 'relative',
			flex: 1
		}
        return (
        <div class="viewer-body" style={style}>
            <SuggestionsListApproved></SuggestionsListApproved>
        </div>
        );
    }
}



export default Body;
