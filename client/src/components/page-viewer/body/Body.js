import React, { Component } from 'react';
import { connect } from 'react-redux'
import SuggestionList from '@/components/suggestion-list/SuggestionList'

const { LIST_APPROVED } = require('@shared/suggestion-util')

const style = {
    position: 'relative'
}

const mapStateToProps = (state, ownProps) => {
    return {
		suggestions: state.suggestions[LIST_APPROVED],
		currentUser: state.user
    }
}
const SuggestionsListApproved = connect(mapStateToProps)(SuggestionList)

class Body extends Component {
    render() {
        return (
        <div class="viewer-body" style={style}>
            <SuggestionsListApproved></SuggestionsListApproved>
        </div>
        );
    }
}



export default Body;
