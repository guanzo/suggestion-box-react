import React, { Component } from 'react';
import Cooldown from './Cooldown'

class PreForm extends Component {
    render() {
		let { channel, isAllowedToSuggest, lastSuggestionDate, onClose, currentUser } = this.props
		let { isAnonymousUser } = currentUser
		let component = '';
		if(isAnonymousUser)
			component = <p className="m-b-15">You must login to post</p>
		else if(!isAllowedToSuggest)
			component = <Cooldown
							postCooldownMinutes={channel.postCooldownMinutes}
							lastSuggestionDate={lastSuggestionDate}
						></Cooldown>
        return (
            <div className="flex-center-children column">
                {component}
                <button className="button is-primary" onClick={onClose}>Okay</button>
            </div>
        )
	}
}
export default PreForm;
