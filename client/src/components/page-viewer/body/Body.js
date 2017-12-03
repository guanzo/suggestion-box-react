import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userTypes } from '@/store/user' 
import SuggestionList from '@/components/suggestion-list/SuggestionList'
import Suggest from '@/components/page-viewer/suggest/Suggest'

const { LIST_APPROVED,LIST_PENDING,LIST_USER } = require('@shared/suggestion-util')

const style = {
    position: 'relative'
}

const mapStateToProps = (state, ownProps) => {
    return {
		suggestions: state.suggestions[LIST_APPROVED],
        ...userTypes(state)
    }
}
const SuggestionsListApproved = connect(mapStateToProps)(SuggestionList)

class Body extends Component {
    render() {
        return (
        <div class="viewer-body" style={style}>
            <SuggestionsListApproved></SuggestionsListApproved>
            <Suggest></Suggest>
        </div>
        );
    }
}



export default Body;
