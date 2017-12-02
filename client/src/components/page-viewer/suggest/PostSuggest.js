import React, { Component } from 'react';

class PostSuggest extends Component {
    render() {
        let { isApproved, onClose } = this.props
        let text = isApproved ? 'Your suggestion has been posted':'Your suggestion is waiting for approval'
        return (
            <div class="flex-center flex-column">
                <p class="m-b-15">{text}</p>
                <button class="button is-primary" onClick={onClose}>Okay</button>
            </div>
        )
    }
}
export default PostSuggest;
