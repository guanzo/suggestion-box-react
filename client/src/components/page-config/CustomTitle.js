/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';
const { TITLE_MAX_LENGTH } = require('@shared/suggestion-util')

class CustomTitle extends Component {
    render() {
		const { title, updateTitle } = this.props
		return(
			<div>
				<h3 className="subtitle">Title</h3>
                <div className="field">
                    <div className="control">
                        <input className="input is-primary"
                            onChange={updateTitle}
                            value={title}
                            maxLength={TITLE_MAX_LENGTH}
                            required
                        />
                    </div>
                </div>
			</div>
		)
	}
}

export default CustomTitle
