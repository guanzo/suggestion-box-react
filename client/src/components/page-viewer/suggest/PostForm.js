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
            <div class="flex-center flex-column">
                <p class="m-b-15">{text}</p>
				<Countdown lastSuggestionDate={lastSuggestionDate}>
				</Countdown>
                <button class="button is-primary" onClick={onClose}>Okay</button>
            </div>
        )
    }
}
export default PostForm;
