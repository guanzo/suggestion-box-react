import React, { Component } from 'react';
import moment from 'moment'
const { MIN_MINUTES_BETWEEN_POSTS } = require('@shared/user-util')

class Countdown extends Component {
	constructor(props){
		super(props)
		this.intervalId = null
		this.state = { 
			time: this.getTime(this.props.lastSuggestionDate) 
		}
		this.startCountdown()
	}
	componentWillUnmount(){
		clearInterval(this.intervalId)
	}
    render() {
		let t = this.state.time
		let times = [t.hours(),t.minutes(),t.seconds()].filter(d=>d>0)
		let language = 'You may post '
		if(times.length === 0)
			language += 'now'
		else
			language += 'again in...'
		
        return (
        <div class="has-text-centered m-b-15">
			<p class="m-b-15">{language}</p> 
			{ times.length ? <p class="is-size-1">{times.join(':')}</p> : '' }
        </div>
        );
	}
	startCountdown(){
		this.tick()
		this.intervalId = setInterval(()=>{
			this.tick()
		},1000)
	}
	tick(){
		let time = moment.duration(this.state.time.subtract(1,'seconds'))
		let times = [time.hours(),time.minutes(),time.seconds()].filter(d=>d > 0)
		if(times.length === 0)
			clearInterval(this.intervalId)

		this.setState({ time })
	}
	getTime(lastSuggestionDate){
		let dateUserCanPost = moment(lastSuggestionDate).add(MIN_MINUTES_BETWEEN_POSTS, 'minutes')
		return moment.duration(dateUserCanPost.diff(moment()))
	}
}

export default Countdown;
