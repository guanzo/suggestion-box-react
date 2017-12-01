import React, { Component } from 'react';
import { connect } from 'react-redux'
import Suggestions from '@/components/suggestions/Suggestions'
import Suggest from '@/components/page-viewer/suggest/Suggest'

const mapStateToProps = (state, ownProps) => {
    return {
        suggestions: state.suggestions
    }
}
const SuggestionsList = connect(mapStateToProps)(Suggestions)

const style = {
    position: 'relative',
    height: '100%'
}

class Body extends Component {
    render() {
        return (
        <div class="suggestion-body" style={style}>
            <SuggestionsList></SuggestionsList>
            <Suggest></Suggest>
        </div>
        );
    }
}



export default Body;
