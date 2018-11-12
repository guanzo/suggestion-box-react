/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';
const { RULE_MAX_LENGTH } = require('@shared/suggestion-util')
class Rules extends Component {
    render() {
		let { rules, handleRuleInput, deleteRule, addRule } = this.props
		const maxRules = 5;

		let inputs = rules.map((rule,i)=>(
			<div className="field has-addons" key={i}>
				<div className="p-r-5">{i+1+'.'}</div>
				<div className="control is-expanded">
					<input className="input is-primary"
						onChange={e=>handleRuleInput(e.target.value,i)}
						value={rule}
						maxLength={RULE_MAX_LENGTH}
						required
					/>
				</div>
				<div onClick={e=>deleteRule(i)} className="control">
					<a className="button is-danger">
						<span className="icon">
							<i className="fa fa-times"></i>
						</span>
					</a>
				</div>
			</div>
			)
		)
		let noRules = <div>You haven't set any rules</div>
		return(
			<div>
				<h3 className="subtitle">Rules</h3>
                <p className="help">
                    Posting etiquette that you want viewers to follow.
                </p>
				{inputs.length ? inputs : noRules}
				<button onClick={addRule}
						disabled={rules.length === maxRules}
						type="button"
						className="button is-small m-t-15"
				>
					<span className="icon has-text-success">
						<i className="fa fa-plus"></i>
					</span>
					<span>Add rule</span>
				</button>
			</div>
		)
	}
}

export default Rules
