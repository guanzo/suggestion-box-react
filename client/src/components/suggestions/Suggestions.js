import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Suggestions.scss';
import { userRoles } from '@/store/user' 
import store from '@/store'


class Suggestions extends Component {
    render() {
        let { props } = this
        var component = props.suggestions.length ? this.suggestionList() : this.noSuggestions()
        return (
            <div class="suggestions">
                {component}
                <div><pre>{JSON.stringify(store.getState(), null, 2) }</pre></div>
                <div>anon {': '+props.isAnonymousUser}</div>
                <div>opaque {': '+props.isOpaqueUser}</div>
                <div>isRealUser {': '+props.isRealUser}</div>
                <div>isModerator {': '+props.isModerator}</div>
                <div>isBroadcaster {': '+props.isBroadcaster}</div>
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
