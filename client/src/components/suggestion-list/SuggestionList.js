import React, { Component } from 'react';
import Suggestion from './suggestion/Suggestion'
import LoadMore from './LoadMore'
import './SuggestionList.scss';
const { LIST_APPROVED } = require('@shared/suggestion-util')

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
		let { channel, currentUser } = this.props
        return (
            <div class="suggestions-list m-b-25">
                {
                    this.props.suggestions.data.map(suggestion=>{
						//console.log(suggestion)
                        return <Suggestion {...suggestion} 
											channel={channel}  
											currentUser={currentUser}
											key={suggestion.id}
								>
							   </Suggestion>
                    })
                }
                <LoadMore {...this.props}></LoadMore>
            </div>
        )
	}
	noSuggestions(){
		let listType = this.props.suggestions.listType
		const style = {
			'text-align': 'center',
			width: '100%',
			color: 'grey'
		}
        return (
            <div class="no-suggestions absolute-center" style={style}>
                { listType === LIST_APPROVED ? this.noApproved() : this.noPending() }
            </div>
        )
	}
    noApproved(){
        return (
			<div>
				No suggestions yet...<br/>
				Must be the perfect stream
			</div>
        )
	}
	noPending(){
        return <div>No pending suggestions</div>
	}
}

export default SuggestionList