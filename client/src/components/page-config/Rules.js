import React, { Component } from 'react';
import { connect } from 'react-redux'

class Rules extends Component {
    render() {
		let { rules } = this.props
		let inputs = rules.map((rule,i)=>(
			<div className="field has-addons" key={i}>
				<div className="p-r-5">{i+1+'.'}</div>
				<div className="control is-expanded">
					<input className="input is-primary" 
						onChange={e=>this.props.handleInput(e.target.value,i)} 
						value={rule} 
						maxLength={100}
						required
					/>
				</div>
				<div onClick={e=>this.props.deleteRule(i)} className="control">
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
				<h3 className="subtitle m-t-25">Rules</h3>
				{inputs.length ? inputs : noRules}
				<a onClick={this.props.addRule} className="button is-small m-t-15">
					<span className="icon has-text-success">
						<i className="fa fa-plus"></i>
					</span>
					<span>Add rule</span>
				</a>
			</div>
		)
	}
}

export default Rules
