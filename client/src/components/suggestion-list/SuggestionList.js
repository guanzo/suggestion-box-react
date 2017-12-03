import React, { Component } from 'react';
import { connect } from 'react-redux'
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import './SuggestionList.scss';
import { userRoles } from '@/store/user' 


class SuggestionList extends Component {
    render() {
        let { props } = this
        var component = props.suggestions.length ? this.suggestionList() : this.noSuggestions()
        return (
            <div class="suggestions">
                {component}
            </div>
        );
    }
    suggestionList(){
        return (
            <div class="suggestions-list">
                {
                    this.props.suggestions.map(suggestion=>{
                        return <Suggestion {...suggestion} ></Suggestion>
                    })
                }
                <LoadMore></LoadMore>
            </div>
        )
    }
    noSuggestions(){
        return (
            <div class="no-suggestions">
                No suggestions yet.. <br/>
                Why don't you be the first?
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        suggestions: state.suggestions,
        ...userRoles(state)
    }
}
const SuggestionsList_C = connect(mapStateToProps)(SuggestionList)

export default SuggestionsList_C;
