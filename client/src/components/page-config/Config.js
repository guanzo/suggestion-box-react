/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import './Config.scss'

class Config extends Component {
	constructor(){
		super()
		this.state = {
			requireApproval: false,
			allowModAdmin: true
		}
	}
	componentWillReceiveProps(props){
		let { channel } = props
		this.setState({ 
			requireApproval: channel.requireApproval,
			allowModAdmin: channel.allowModAdmin
		})
	}
    render() {
		let { requireApproval, allowModAdmin } = this.state
        return (
        <div className="config">
			<h3 className="title">Thanks for installing Suggestion Box!</h3>
			<p className="m-b-15">I hope this extension will make your stream experience better.</p>
        	<h3 className="title is-4">Settings</h3>
			<div className="field">  
				<div className="control">
					<label className="checkbox"> 
					<input type="checkbox" className="m-r-5" style={{'vertical-align': 'middle'}} 
					checked={requireApproval}
					onChange={e=>{
							this.setState({ requireApproval: e.target.checked },
								this.updateSettings)
						}
					}
					/>
						Require suggestions to be approved 
					</label>
					<p className="help">
						By default, anybody will be able to publicly post to your suggestion box.<br />
						Check this box if you want each suggestion to be approved by you or a moderator before going public.
					</p>
				</div>
			</div>
			<div className="field">  
				<div className="control">
					<label className="checkbox"> 
					<input type="checkbox" className="m-r-5" style={{'vertical-align': 'middle'}} 
					checked={allowModAdmin}
					onChange={e=>{
							this.setState({ allowModAdmin: e.target.checked },
								this.updateSettings)
						}
					}
					/>
						Allow moderators to administer suggestions
					</label>
					<p className="help">Chat moderators will have the same admin control as you. 
						They will be able to approve and delete suggestions.<br />
						Moderators must grant this extension their Twitch User ID in order to become admins.
					</p>
				</div>
			</div>
			<p className="p-t-15">Your changes will be saved automatically.</p>
        </div>
        );
	}
	updateSettings(){
		let { channelId } = this.props.channel
		axios.put(`/api/channels/${channelId}/settings`,this.state)
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
		channel: state.channel
    }
}
export default connect(mapStateToProps)(Config)
