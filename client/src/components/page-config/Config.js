/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialState, updateChannel } from '@store/channel'
import store from '@store'
import _ from 'lodash'
import classNames from 'classnames'
import ToggleSettings from './ToggleSettings'
import Theme from './Theme'
import CustomTitle from './CustomTitle'
import PostCooldown from './PostCooldown'
import Rules from './Rules'
import './Config.scss'

const settingsProperties = [
    'filterProfanity',
    'requireApproval',
    'allowModAdmin',
    'rules',
    'postCooldownMinutes',
    'title',
    'theme'
]
const defaultSettings = _.pick(initialState.channel,settingsProperties)

class Config extends Component {
	constructor(props){
		super(props)
		this.state = {
			isLoading: false,
			...defaultSettings
		}
		this.updateSettings 		= this.updateSettings.bind(this)
		this.handleCheckboxInput 	= this.handleCheckboxInput.bind(this)
		this.handleRuleInput 		= this.handleRuleInput.bind(this)
		this.deleteRule 			= this.deleteRule.bind(this)
		this.addRule 				= this.addRule.bind(this)
		this.updateCooldown 		= this.updateCooldown.bind(this)
		this.updateTheme 		    = this.updateTheme.bind(this)
	}
	componentWillReceiveProps(props){
        let settings = _.pick(props.channel, settingsProperties)
		this.setState(settings)
	}
    render() {
		let { appIsLoading } = this.props
        return appIsLoading ? null : this.renderSettings()
	}
	renderSettings(){
		let { isLoading, ...settings } = this.state
		let hasUnsavedChanges = this.hasUnsavedChanges()
		let btnClass = classNames(
            "button",
            { 'is-loading': isLoading },
            hasUnsavedChanges ? 'is-warning':'is-success'
        )

		return (
			<div className="config">
				<h3 className="subtitle is-4">
                    Thanks for installing Suggestion Box!
                </h3>
				<hr />
				<form onSubmit={this.updateSettings}>
                    <div>
                        <h3 className="subtitle is-4">Settings</h3>
                        <p className="help">
                            Make sure to save your changes.
                        </p>
                    </div>
                    <ToggleSettings
                        handleCheckboxInput={this.handleCheckboxInput}
						{...settings}
                    />
                    <Theme
                        theme={settings.theme}
                        updateTheme={this.updateTheme}
                    />
                    <CustomTitle
                        title={settings.title}
                        updateTitle={this.updateTitle}
                    />
					<PostCooldown
                        postCooldownMinutes={settings.postCooldownMinutes}
					    updateCooldown={this.updateCooldown}
                     />
                    <Rules
                        rules={settings.rules}
						handleRuleInput={this.handleRuleInput}
						deleteRule={this.deleteRule}
						addRule={this.addRule}
                    />
					<div>
                        {hasUnsavedChanges
                        && <div className="help m-b-5">You have unsaved changes.</div>
                        }
						<button className={btnClass}>Save</button>
					</div>
				</form>
			</div>
		)
	}
	hasUnsavedChanges(){
		let originalSettings = _.pick(this.props.channel, settingsProperties)
        let currentSettings  = _.pick(this.state, settingsProperties)

		return !_.isEqual(originalSettings,currentSettings)
	}
	handleCheckboxInput(propertyName, isChecked){
		this.setState({ [propertyName]: isChecked })
	}
	handleRuleInput(rule,index){
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
	updateCooldown(postCooldownMinutes){
		this.setState({ postCooldownMinutes })
	}
	updateTheme(themeName, value) {
        const theme = {...this.state.theme}
        theme[themeName] = value
        this.setState({ theme })
	}
	updateTitle(event) {
		this.setState({ title: event.target.value })
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
		channel: state.channel,
		appIsLoading: state.isLoading
    }
}
export default connect(mapStateToProps)(Config)
