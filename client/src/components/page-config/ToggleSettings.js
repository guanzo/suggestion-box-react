/*eslint react/jsx-no-bind:0*/

import React, { Component, Fragment } from 'react';

class ToggleSettings extends Component {
    render() {
		return (
			<div>
                {this.checkbox(
                    'filterProfanity',
                    'Automatically block posts that contain profanity. (Recommended)',
                    'We all know how toxic twitch chat can be.',
                    'The profanity filter isn\'t perfect and may block non-malicious posts. Better safe than sorry.'
                )}
				{this.checkbox(
					'requireApproval',
					'Require suggestions to be approved',
					'By default, anybody will be able to publicly post to your suggestion box.',
					'Check this box if you want each suggestion to be approved by you or a moderator before going public.'
				)}
				{this.checkbox(
					'allowModAdmin',
					'Allow moderators to administer suggestions',
					'Chat moderators will have the same admin control as you. They will be able to approve and delete suggestions.',
					'Moderators must grant this extension their Twitch User ID in order to become admins.'
				)}
			</div>
		)
	}
	checkbox(propertyName,label, ...help){
		let style = {verticalAlign: 'middle'}
		let propertyValue = this.props[propertyName]
		return (
			<div className="field">
				<div className="control">
					<label className="checkbox">
					<input type="checkbox" className="m-r-5" style={style}
					checked={propertyValue}
					onChange={e => this.props.handleCheckboxInput(propertyName, e.target.checked)}
					/>
						{label}
					</label>
					<p className="help">
					{help.map(d=><Fragment key={d}>{d}<br/></Fragment>)}
					</p>
				</div>
			</div>
		)
	}
}
export default ToggleSettings;
