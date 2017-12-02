import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Suggestions.scss';
import { userRoles } from '@/store/user' 


class Suggestions extends Component {
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
                        return <div class="suggestions">{suggestion.text}</div>
                    })
                }
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
const Suggestions_C = connect(mapStateToProps)(Suggestions)

export default Suggestions_C;
