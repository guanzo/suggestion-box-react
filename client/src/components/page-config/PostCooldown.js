/*eslint react/jsx-no-bind:0*/

import React, { Component } from 'react';

class Rules extends Component {
	constructor(props){
		super(props)
		let { postCooldownMinutes } = props;
		let hours = this.getTotalHours(postCooldownMinutes)
		let minutes = this.getRemainingMinutes(postCooldownMinutes)
		
		this.state = {
			hasBlankField: false,
			hours,
			minutes,
		}
	}
    render() {
		let { hours, minutes, hasBlankField } = this.state
		return(
			<div className="post-cooldown">
				<h3 className="subtitle m-t-25">Post Cooldown <p className="help">The amount of time a viewer must wait until he can post again.</p></h3>
				<div className="field is-grouped">
					<div className="field">
						<label className="label">Hours</label>
						<div className="control">
							<input className="input" 
									value={hours}
									onChange={e=>this.setTime("hours",e)}
									type="number" 
									min="0"
									max="99" 
									placeholder="24" 
									required
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Minutes</label>
						<div className="control">
							<input className="input" 
									value={minutes}
									onChange={e=>this.setTime("minutes",e)}
									type="number"
									min="0" 
									max="59" 
									placeholder="0" 
									required
							 />
						</div>
					</div>
				</div>
				{ hasBlankField && <p class="help has-text-danger">These fields cannot be blank, enter a zero instead</p> }
			</div>
		)
	}
	setTime(unit, e){
		let { value } = e.target
		let hasBlankField = value.length === 0

		this.setState({ 
			[unit]: parseInt(value,10),
			hasBlankField
		}, ()=>{
			this.props.updateCooldown(this.calculateTotalMinutes())
		})
	}
	getTotalHours(postCooldownMinutes){
		return Math.floor(postCooldownMinutes/60)
	}
	getRemainingMinutes(postCooldownMinutes){
		return postCooldownMinutes%60;
	}
	calculateTotalMinutes(){
		let { hours, minutes } = this.state
		return (hours * 60) + minutes;
	}
}

export default Rules
