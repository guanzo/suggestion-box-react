import React, { Component } from 'react';
import Cooldown from './Cooldown'
const { STATUS_APPROVED, STATUS_PENDING, STATUS_DENIED } = require('@shared/suggestion-util')

class PostForm extends Component {
    render() {
		let { channel, status, lastSuggestionDate, onClose } = this.props
		let text;
		if(status === STATUS_APPROVED)
			text = <span>has been <span className="has-text-success">submitted</span></span>
		else if(status === STATUS_PENDING)
			text = <span>is <span className="has-text-primary">pending approval</span></span>
		else if(status === STATUS_DENIED)
			text = <span>is <span className="has-text-danger">denied</span></span>

        return (
            <div className="flex-center column">
                <p className="m-b-15">Your suggestion {text}</p>
				<Cooldown 
					postCooldownMinutes={channel.postCooldownMinutes}
					lastSuggestionDate={lastSuggestionDate}
				></Cooldown>
                <button className="button is-primary" onClick={onClose}>Okay</button>
				<p className="has-text-centered help m-t-50">
					Your suggestion is subject <br/>to moderation at any time
				</p>
			</div>
        )
    }
}
export default PostForm;
