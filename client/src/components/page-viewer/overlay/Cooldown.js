import React, { Component } from 'react';
import moment from 'moment'

class Cooldown extends Component {
	constructor(props){
		super(props)
		this.intervalId = null
		this.state = {
			time: this.getTime(props.lastSuggestionDate)
		}
	}
	componentDidMount(){
		this.tick()
		this.intervalId = setInterval(()=>this.tick(),1000)
	}
	componentWillUnmount(){
		clearInterval(this.intervalId)
	}
    render() {
		let t = this.state.time
		let hasTimeRemaining = this.hasTimeRemaining()
		let language = 'You may post again'
		if(hasTimeRemaining)
			language += ' in...'

		let timeRemaining;
		if(t.asDays() > 1)
			timeRemaining = t.days() + ' day' + (t.days() > 1 ? 's':'')
		else
			timeRemaining = moment.utc(t.asMilliseconds()).format("HH:mm:ss")

        return (
        <div className="has-text-centered m-b-15">
			<p className="m-b-15">{language}</p>
			{ hasTimeRemaining && <p className="is-size-1">{timeRemaining}</p> }
        </div>
        )
	}
	hasTimeRemaining(){
		return this.state.time.asMilliseconds() > 0
	}
	tick(){
		let time = moment.duration(this.state.time.subtract(1,'seconds'))
		this.setState({ time })

		if(!this.hasTimeRemaining())
			clearInterval(this.intervalId)
	}
	getTime(lastSuggestionDate){
		let { postCooldownMinutes } = this.props
		let dateUserCanPost = moment(lastSuggestionDate).add(postCooldownMinutes, 'minutes')
		return moment.duration(dateUserCanPost.diff(moment()))
	}
}

export default Cooldown;
