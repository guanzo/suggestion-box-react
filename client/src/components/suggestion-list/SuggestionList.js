import React, { Component } from 'react';
import { connect } from 'react-redux'
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import './SuggestionList.scss';
import { userTypes } from '@/store/user' 


class SuggestionList extends Component {
    render() {
		let { props } = this
		var component = props.suggestions.data.length
						? this.suggestionList() 
						: this.noSuggestions()
        return (
            <div class="suggestions">
                {component}
            </div>
        );
    }
    suggestionList(){
		let { userTypes } = this.props
		let { listType } = this.props.suggestions
		let props = {
			userTypes, listType
		}
        return (
            <div class="suggestions-list">
                {
                    this.props.suggestions.data.map(suggestion=>{
                        return <Suggestion {...Object.assign({},suggestion,props)}>
							   </Suggestion>
                    })
                }
                <LoadMore {...this.props}></LoadMore>
            </div>
        )
    }
    noSuggestions(){
        return (
            <div class="no-suggestions">
                No suggestions yet... <br/>
                Let your voice be heard.
            </div>
        )
    }
}

export default SuggestionList