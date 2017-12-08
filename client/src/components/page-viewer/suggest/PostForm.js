import React, { Component } from 'react';
import Countdown from './Countdown'
const { STATUS_APPROVED } = require('@shared/suggestion-util')

class PostForm extends Component {
    render() {
        let { status, lastSuggestionDate, onClose } = this.props
        let text = (status === STATUS_APPROVED) 
        ? 'Your suggestion has been submitted'
        : 'Your suggestion is pending approval'
        return (
            <div className="flex-center column">
                <p className="m-b-15">{text}</p>
				<Countdown lastSuggestionDate={lastSuggestionDate}>
				</Countdown>
                <button className="button is-primary" onClick={onClose}>Okay</button>
				<p className="has-text-centered help m-t-50">
					Your suggestion is subject <br/>to moderation at any time
				</p>
			</div>
        )
    }
}
export default PostForm;
