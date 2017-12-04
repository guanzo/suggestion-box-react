import React, { Component } from 'react';
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import './SuggestionList.scss';


class SuggestionList extends Component {
    render() {
		let { props } = this
		var component = props.suggestions.data.length
						? this.suggestionList() 
						: this.noSuggestions()
        return (
            component
        );
    }
    suggestionList(){
		let { listType } = this.props.suggestions
        return (
            <div class="suggestions-list">
                {
                    this.props.suggestions.data.map(suggestion=>{
                        return <Suggestion {...suggestion} listType={listType} key={suggestion.id}>
							   </Suggestion>
                    })
                }
                <LoadMore {...this.props}></LoadMore>
            </div>
        )
    }
    noSuggestions(){
		const style = {
			color: 'dimgrey',
			'text-align': 'center',
			width: '100%'
		}
        return (
            <div class="no-suggestions absolute-center" style={style}>
                No suggestions yet... <br/>
				You can be the first!
            </div>
        )
    }
}

export default SuggestionList