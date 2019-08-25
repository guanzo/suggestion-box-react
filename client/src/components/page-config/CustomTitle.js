/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';
const { TITLE_MAX_LENGTH } = require('@shared/suggestion-util')

class CustomTitle extends Component {
    render() {
		const { title, updateTitle, titleFontSize, updateTitleFontSize } = this.props
		return(
			<div className="custom-title">
				<h3 className="subtitle">Title</h3>
                <div className="field">
                    <div className="control">
                        <input className="input is-primary"
                            onChange={updateTitle}
                            value={title}
                            minLength="1"
                            maxLength={TITLE_MAX_LENGTH}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Font size</label>
                    <div className="control">
                        <input className="input"
                            value={titleFontSize}
                            onChange={updateTitleFontSize}
                            type="number"
                            min="12"
                            max="50"
                            placeholder="32"
                            required
                        />
                    </div>
                </div>
			</div>
		)
    }
    updateTitle () {

    }
}

export default CustomTitle
