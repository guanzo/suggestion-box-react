import React, { Component } from 'react';
import { connect } from 'react-redux'
import Suggestions from '@/components/suggestions/Suggestions'
import './Viewer.scss';

const mapStateToProps = (state, ownProps) => {
    return {
        suggestions: state.suggestions
    }
}
const SuggestionsList = connect(mapStateToProps)(Suggestions)


class Viewer extends Component {
    render() {
        return (
        <div class="viewer">
            <h1 class="title has-text-centered">Suggestion Box</h1>
            <SuggestionsList></SuggestionsList>
        </div>
        );
    }
}



export default Viewer;
