import React, { Component } from 'react';
import moment from 'moment'
const { MIN_MINUTES_BETWEEN_POSTS } = require('@shared/user-util')

class Countdown extends Component {
	constructor(props){
		super(props)
		this.intervalId = null
		this.state = { time: this.getTime() }
	}
	componentDidMount(){
		this.setState({ time: this.getTime() })

		this.intervalId = setInterval(()=>{
			let time = moment.duration(this.state.time.subtract(1,'seconds'))
			this.setState({ time })
		},1000)
	}
	componentWillUnmount(){
		clearInterval(this.intervalId)
	}
    render() {
		let t = this.state.time
        return (
        <div class="m-b-15">
            <p class="has-text-centered m-b-15">You may post again in...</p>
			<p class="is-size-1">{t.hours()+':'+t.minutes()+':'+t.seconds()}</p>
        </div>
        );
	}
	getTime(){
		let { lastSuggestionDate } = this.props
		let dateUserCanPost = moment(lastSuggestionDate).add(MIN_MINUTES_BETWEEN_POSTS, 'minutes')
		return moment.duration(dateUserCanPost.diff(moment()))
	}
}

export default Countdown;
