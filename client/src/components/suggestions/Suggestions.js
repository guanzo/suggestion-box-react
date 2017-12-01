import React, { Component } from 'react';
import store from '@/store'
import './Suggestions.scss';



class Suggestions extends Component {
    constructor(){
        super()
        this.state = {
            suggestions: []
        }
        store.subscribe((...args)=>{
            this.setState({ suggestions: store.getState().suggestions })
        })
    }
    render() {
        var component = this.state.suggestions.length ? this.suggestionList() : this.noSuggestions()
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
                    this.state.suggestions.map(suggestion=>{
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
/* 
const mapDispatchToProps = (dispatch,test) => {
    return {
        onSubmit: text => {
            return dispatch(postSuggestion(text))
        }
    }
}
const Suggest_C = connect(null,mapDispatchToProps)(Suggest) */

export default Suggestions;
