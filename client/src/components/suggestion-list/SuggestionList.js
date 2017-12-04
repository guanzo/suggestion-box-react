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
		const style = {
			'text-align': 'center',
			width: '100%',
			color: 'grey'
		}
        return (
            <div class="no-suggestions absolute-center" style={style}>
                <div class="m-b-15">
					No suggestions yet...<br/>
					Must be the perfect stream
				</div>
            </div>
        )
    }
}

export default SuggestionList