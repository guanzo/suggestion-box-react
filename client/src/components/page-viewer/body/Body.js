import React, { Component } from 'react';
import { connect } from 'react-redux'
import SuggestionList from '@/components/suggestion-list/SuggestionList'

const { LIST_APPROVED } = require('@shared/suggestion-util')


const mapStateToProps = (state, ownProps) => {
	let { currentListType } = state.suggestions
    return {
		suggestions: state.suggestions[currentListType],
		currentUser: state.user,
		channel: state.channel
    }
}
const SuggestionsList_C = connect(mapStateToProps)(SuggestionList)

class Body extends Component {
    render() {
		const style = {
			position: 'relative',
			flex: 1
		}
        return (
        <div class="viewer-body" style={style}>
            <SuggestionsList_C></SuggestionsList_C>
        </div>
        );
    }
}



export default Body;
