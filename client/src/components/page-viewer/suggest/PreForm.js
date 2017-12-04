import React, { Component } from 'react';
import Countdown from './Countdown'

class PreForm extends Component {
    render() {
		let { isAllowedToSuggest, lastSuggestionDate, onClose, currentUser } = this.props
		let { isAnonymousUser } = currentUser
		let component = '';
		if(isAnonymousUser)
			component = <p class="m-b-15">You must login to post</p>
		else if(!isAllowedToSuggest)
			component = <Countdown lastSuggestionDate={lastSuggestionDate}></Countdown>
        return (
            <div class="flex-center flex-column">
                {component}
                <button class="button is-primary" onClick={onClose}>Okay</button>
            </div>
        )
	}
	notAllowedToVoteText(){
		console.log(this.props)
		return 'Not allowed to vote'
	}
}
export default PreForm;
