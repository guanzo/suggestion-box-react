import React, { Component } from 'react';
import moment from 'moment'
const { MIN_MINUTES_BETWEEN_POSTS } = require('@shared/user-util')

class Countdown extends Component {
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
		let language = 'You may post '
		if(!hasTimeRemaining)
			language += 'now'
		else
			language += 'again in...'
		
		let format = moment.utc(t.asMilliseconds()).format("HH:mm:ss")

        return (
        <div className="has-text-centered m-b-15">
			<p className="m-b-15">{language}</p> 
			{ hasTimeRemaining ? <p className="is-size-1">{format}</p> : null }
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
		let dateUserCanPost = moment(lastSuggestionDate).add(MIN_MINUTES_BETWEEN_POSTS, 'minutes')
		return moment.duration(dateUserCanPost.diff(moment()))
	}
}

export default Countdown;
