import React, { Component } from 'react';
const { STATUS_APPROVED } = require('@shared/suggestion-util')

class PostSuggest extends Component {
    render() {
        let { status, onClose } = this.props
        let text = (status === STATUS_APPROVED) 
        ? 'Your suggestion has been submitted'
        : 'Your suggestion is pending approval'
        return (
            <div class="flex-center flex-column">
                <p class="m-b-15">{text}</p>
                <button class="button is-primary" onClick={onClose}>Okay</button>
            </div>
        )
    }
}
export default PostSuggest;
