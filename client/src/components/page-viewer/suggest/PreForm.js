import React, { Component } from 'react';
import Countdown from './Countdown'

class PreForm extends Component {
    render() {
		let { isAllowedToSuggest, lastSuggestionDate, onClose, currentUser } = this.props
		let { isAnonymousUser } = currentUser
		let component = '';
		if(isAnonymousUser)
			component = <p className="m-b-15">You must login to suggest</p>
		else if(!isAllowedToSuggest)
			component = <Countdown lastSuggestionDate={lastSuggestionDate}></Countdown>
        return (
            <div className="flex-center flex-column">
                {component}
                <button className="button is-primary" onClick={onClose}>Okay</button>
            </div>
        )
	}
}
export default PreForm;
