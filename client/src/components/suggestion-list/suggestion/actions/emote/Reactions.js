import React, { PureComponent } from 'react';
import _ from 'lodash'
import EmoteImage from './EmoteImage'

class Reactions extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			limit: 3,
			showAll: false,
			reactions: []
		}
	}
	componentWillReceiveProps(props){
		let { emoteReactions } = props
		let reactions = this.groupedEmotes(emoteReactions)
		this.setState({ reactions })
	}
    render() {
		let { onSelectEmote } = this.props
		let { reactions, showAll, limit } = this.state
		reactions = showAll ? reactions : reactions.slice(0,limit)
		return (
			<React.Fragment>
				{reactions.map(({emoteId, count})=>(
					<div className="reaction" key={emoteId}>
						<EmoteImage emote={{id: emoteId}}
									onSelectEmote={onSelectEmote}
						></EmoteImage>
						<div className="reaction-count">{count}</div>
					</div>
				))}
				{this.remainingEmotes()}
			</React.Fragment>
		)
	}
	remainingEmotes(){
		let { reactions, showAll, limit } = this.state
		let remaining = reactions.length - limit
		return (
			remaining > 0 && !showAll
			? <div onClick={this.showAllEmotes}
					className="show-all-emotes is-size-7">{remaining} more...</div> 
			: null
		)
	}
	showAllEmotes = ()=>{
		this.setState({ showAll: true })
	}
	groupedEmotes(emoteReactions){
		let { limit } = this.state
		return _(emoteReactions)
				.countBy()
				.map((val,key)=>({emoteId: key, count: val}))
				.orderBy('count',['desc'])
				.value()
	}
}

export default Reactions

