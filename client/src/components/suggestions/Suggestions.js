import React, { Component } from 'react';
import './Suggestions.scss';

class Suggestions extends Component {
    render() {
        var component = this.props.suggestions.length ? this.suggestionList() : this.noSuggestions()
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
                        return <div class="suggestions">{suggestion}</div>
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

export default Suggestions;
