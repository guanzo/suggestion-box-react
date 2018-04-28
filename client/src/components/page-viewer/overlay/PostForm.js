import React, { Component } from 'react';
const { 
    STATUS_APPROVED, STATUS_PENDING, STATUS_COOLDOWN_DENIED, STATUS_PROFANITY_DENIED
} = require('@shared/suggestion-util')

class PostForm extends Component {
    render() {
		let { channel, status, lastSuggestionDate, onClose } = this.props
		let text;
		if(status === STATUS_APPROVED)
			text = <span>has been <span className="has-text-success">submitted</span></span>
		else if(status === STATUS_PENDING)
			text = <span>is <span className="has-text-primary">pending approval</span></span>
		else if(status === STATUS_COOLDOWN_DENIED)
			text = <span>is <span className="has-text-danger">denied</span></span>
        else if(status === STATUS_PROFANITY_DENIED)
            text =  (
                    <React.Fragment>
                    <span>is <span className="has-text-danger">denied</span></span>
                    <p className="help">Potential profanity was detected in your post.</p>
                    <p className="help">This channel does not allow toxicity, mind your manners.</p>
                    </React.Fragment>
                    )

        return (
            <div className="flex-center column has-text-centered">
                <p className="m-b-30 ">Your suggestion {text}</p>
                <button className="button is-primary m-b-30" onClick={onClose}>Okay</button>
				<p className="help">
					Your suggestion is subject <br/>to moderation at any time
				</p>
			</div>
        )
    }
}
export default PostForm;
