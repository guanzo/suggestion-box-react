/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { initialState, updateChannel } from '@store/channel'
import store from '@store'
import _ from 'lodash'
import classNames from 'classnames'
import Rules from './Rules'
import './Config.scss'

const settingsProperties = ['requireApproval','allowModAdmin','rules']
const defaultSettings = _.pick(initialState.channel,settingsProperties)

class Config extends Component {
	constructor(props){
		super(props)
		this.state = {
			isLoading: false,
			...defaultSettings
		}
		this.updateSettings = this.updateSettings.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.deleteRule = this.deleteRule.bind(this)
		this.addRule = this.addRule.bind(this)
	}
	componentWillReceiveProps(props){
		let { requireApproval, allowModAdmin, rules } = props.channel
		this.setState({ requireApproval, allowModAdmin, rules })
	}
	hasUnsavedChanges(){
		let originalSettings = _.pick(this.props.channel,settingsProperties)
		let currentSettings  = _.pick(this.state,settingsProperties)

		return !_.isEqual(originalSettings,currentSettings)
	}
    render() {
		let { isLoading } = this.state
		let hasUnsavedChanges = this.hasUnsavedChanges()
		let btnClass = classNames("button", 
								{ 'is-loading': isLoading }, 
								hasUnsavedChanges ? 'is-warning':'is-success'
							)
        return (
        <div className="config">
			<h3 className="subtitle">Thanks for installing Suggestion Box!</h3>
			<p className="m-b-15">I hope this extension will make your stream experience better.</p>
			<hr />
			<form onSubmit={this.updateSettings}>
        		<h3 className="subtitle m-t-25">Settings</h3>
				{
					this.checkbox(
						'requireApproval',
						'Require suggestions to be approved',
						'By default, anybody will be able to publicly post to your suggestion box.',
						'Check this box if you want each suggestion to be approved by you or a moderator before going public.'
					)
				}
				{
					this.checkbox(
						'allowModAdmin',
						'Allow moderators to administer suggestions',
						'Chat moderators will have the same admin control as you. They will be able to approve and delete suggestions.',
						'Moderators must grant this extension their Twitch User ID in order to become admins.'
					)
				}
				<Rules rules={this.state.rules} 
						handleInput={this.handleInput}
						deleteRule={this.deleteRule}
						addRule={this.addRule}
				></Rules>
				<div className="m-t-40">
					{hasUnsavedChanges ? <div className="help m-b-5">You have unsaved changes</div> : null}
					<button className={btnClass}>Save</button>
				</div>
			</form>
        </div>
        );
	}
	checkbox(propertyName,label, ...help){
		let style = {verticalAlign: 'middle'}
		let propertyValue = this.state[propertyName]
		return (
			<div className="field">  
				<div className="control">
					<label className="checkbox"> 
					<input type="checkbox" className="m-r-5" style={style} 
					checked={propertyValue}
					onChange={e=>this.setState({ [propertyName]: e.target.checked })}
					/>
						{label}
					</label>
					<p className="help">
					{help.map(d=><>{d}<br/></>)}
					</p>
				</div>
			</div>
		)
	}
	handleInput(rule,index){
		let rules = [...this.state.rules]
		rules[index] = rule
		this.setState({ rules })
	}
	addRule(){
		let rules = [...this.state.rules, '']
		this.setState({ rules })
	}
	deleteRule(index){
		let rules = this.state.rules.filter((d,i)=>i !== index)
		this.setState({ rules })
	}
	async updateSettings(e){
		e.preventDefault();
		let settings  = _.pick(this.state,settingsProperties)		
		
		this.setState({ isLoading: true })
		await store.dispatch(updateChannel(settings))
        this.setState({ isLoading: false })
        
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
		channel: state.channel
    }
}
export default connect(mapStateToProps)(Config)
